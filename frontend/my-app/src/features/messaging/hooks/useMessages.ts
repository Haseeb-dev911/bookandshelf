import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingApi } from '../services/messagingApi';
import { useSocket } from './useSocket';
import { useEffect } from 'react';
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

            queryClient.setQueryData<Message[]>(['messages', conversationId], old => [...(old || []), optimisticMsg]);

            // Emit socket event optimistically
            if (socket) {
                socket.emit("sendMessage", optimisticMsg);
            }

            return { previousMessages };
        },
        onError: (_err, _newMsg, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(['messages', conversationId], context.previousMessages);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
    });

    const markReadMutation = useMutation({
        mutationFn: () => messagingApi.markMessagesAsRead(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            if (socket && messages.length > 0) {
                // Find receiverId from the last message where sender was the other person
                const otherMsg = messages.find(m => m.senderId !== user?.id);
                if (otherMsg) {
                    socket.emit("markRead", { conversationId, senderId: otherMsg.senderId, receiverId: user?.id });
                }
            }
        }
    });

    // Listen to real-time events
    useEffect(() => {
        if (!socket || !conversationId) return;

        const handleNewMessage = (msg: Message) => {
            if (msg.conversationId === conversationId) {
                queryClient.setQueryData<Message[]>(['messages', conversationId], old => {
                    const exists = old?.find(m => m.id === msg.id);
                    if (exists) return old || [];
                    return [...(old || []), msg];
                });

                // Auto mark read if chat is open and we are receiver
                if (msg.receiverId === user?.id) {
                    markReadMutation.mutate();
                }
            }
        };

        const handleMessageRead = (data: { conversationId: string, readAt: string }) => {
            if (data.conversationId === conversationId) {
                queryClient.setQueryData<Message[]>(['messages', conversationId], old => {
                    if (!old) return [];
                    return old.map(m => (!m.isRead && m.senderId === user?.id) ? { ...m, isRead: true, readAt: data.readAt } : m);
                });
            }
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('messageRead', handleMessageRead);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('messageRead', handleMessageRead);
        };
    }, [socket, conversationId, queryClient, user?.id]);

    return {
        messages,
        isLoading,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
        markAsRead: markReadMutation.mutate
    };
};
