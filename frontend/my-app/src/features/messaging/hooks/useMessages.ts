import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingApi } from '../services/messagingApi';
import { useSocket } from './useSocket';
import { useEffect, useCallback } from 'react';
import { Message, SendMessagePayload } from '../types/messaging.types';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

export const useMessages = (conversationId: string) => {
    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;

    const { data: messages = [], isLoading } = useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => messagingApi.getMessages(conversationId),
        enabled: !!conversationId
    });

    // ─── Mark-as-read mutation ──────────────────────────────────────────────────
    const markReadMutation = useMutation({
        mutationFn: () => messagingApi.markMessagesAsRead(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            if (socket) {
                // Inform the sender that their messages were read
                const otherMsg = queryClient
                    .getQueryData<Message[]>(['messages', conversationId])
                    ?.find((m) => m.senderId !== user?.id);
                if (otherMsg) {
                    socket.emit('markRead', {
                        conversationId,
                        senderId: otherMsg.senderId,
                        receiverId: user?.id,
                    });
                }
            }
        }
    });

    // ─── Send message mutation ─────────────────────────────────────────────────
    const sendMessageMutation = useMutation({
        mutationFn: (payload: SendMessagePayload) => messagingApi.sendMessage(payload),
        onMutate: async (newMsg) => {
            await queryClient.cancelQueries({ queryKey: ['messages', conversationId] });
            const previousMessages = queryClient.getQueryData<Message[]>(['messages', conversationId]);

            const optimisticMsg: Message = {
                id: `temp-${Date.now()}`,
                conversationId: newMsg.conversationId,
                senderId: user!.id,
                receiverId: newMsg.receiverId,
                content: newMsg.content,
                isRead: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            queryClient.setQueryData<Message[]>(['messages', conversationId], old => [
                ...(old || []),
                optimisticMsg
            ]);

            // NOTE: We do NOT emit the socket event here. The backend HTTP handler
            // already emits to both users after persisting. Emitting from the client
            // as well would cause the receiver to get a duplicate temp-ID message
            // followed by the real DB message with a different ID.

            return { previousMessages };
        },
        onError: (_err, _newMsg, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(['messages', conversationId], context.previousMessages);
            }
        },
        onSettled: () => {
            // Invalidate to replace the temp optimistic message with the real DB record
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
    });

    // ─── Stable event handlers (useCallback avoids stale closures in listener) ──
    // CRITICAL FIX: By using useCallback with explicit deps, we produce a stable
    // function reference that captures the correct conversationId and user.id.
    // Without useCallback, the handlers inside useEffect form stale closures over
    // the initial render values of those variables.
    const handleNewMessage = useCallback((msg: Message) => {
        if (msg.conversationId !== conversationId) return;

        queryClient.setQueryData<Message[]>(['messages', conversationId], old => {
            // Deduplicate: ignore if already present (e.g., our own optimistic message
            // was replaced by the invalidation query above)
            if (old?.some(m => m.id === msg.id)) return old;
            return [...(old || []), msg];
        });

        // Auto mark read if this chat is open and the logged-in user is the receiver
        if (msg.receiverId === user?.id) {
            markReadMutation.mutate();
        }
    // markReadMutation.mutate is stable — mutate refs don't change across renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationId, queryClient, user?.id]);

    const handleMessageRead = useCallback((data: { conversationId: string; readAt: string }) => {
        if (data.conversationId !== conversationId) return;
        queryClient.setQueryData<Message[]>(['messages', conversationId], old => {
            if (!old) return [];
            return old.map(m =>
                !m.isRead && m.senderId === user?.id
                    ? { ...m, isRead: true, readAt: data.readAt }
                    : m
            );
        });
    }, [conversationId, queryClient, user?.id]);

    // ─── Socket listener registration ──────────────────────────────────────────
    // Runs only when socket instance or stable handler refs change.
    useEffect(() => {
        if (!socket || !conversationId) return;

        socket.on('newMessage', handleNewMessage);
        socket.on('messageRead', handleMessageRead);

        return () => {
            // Clean up exactly the handlers we registered — not all handlers.
            socket.off('newMessage', handleNewMessage);
            socket.off('messageRead', handleMessageRead);
        };
    }, [socket, conversationId, handleNewMessage, handleMessageRead]);

    return {
        messages,
        isLoading,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
        markAsRead: markReadMutation.mutate
    };
};
