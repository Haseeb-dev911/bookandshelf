import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingApi } from '../services/messagingApi';
import { useSocket } from './useSocket';
import { useEffect, useCallback } from 'react';
import { Conversation } from '../types/messaging.types';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

export const useConversations = () => {
    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;

    const { data: conversations = [], isLoading } = useQuery({
        queryKey: ['conversations'],
        queryFn: () => messagingApi.getConversations(),
        enabled: !!user
    });

    const createConversationMutation = useMutation({
        mutationFn: (receiverId: string) => messagingApi.createConversation(receiverId),
        onSuccess: (newConv) => {
            queryClient.setQueryData<Conversation[]>(['conversations'], old => {
                const exists = old?.find(c => c.id === newConv.id);
                if (exists) return old || [];
                return [newConv, ...(old || [])];
            });
        }
    });

    // ─── Stable handlers with useCallback ─────────────────────────────────────
    // IMPORTANT: This hook must NOT register its own 'newMessage' listener.
    // useMessages already handles that and updates the cache. If we also listen
    // here, every incoming message triggers TWO invalidations causing a flash of
    // stale state. Instead, we only listen to 'conversationUpdated', which is the
    // backend's signal that the conversation list needs refreshing (last message
    // preview, unread count, etc.).
    const handleConversationUpdated = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }, [queryClient]);

    useEffect(() => {
        if (!socket || !user) return;

        socket.on('conversationUpdated', handleConversationUpdated);

        return () => {
            socket.off('conversationUpdated', handleConversationUpdated);
        };
    }, [socket, user, handleConversationUpdated]);

    return {
        conversations,
        isLoading,
        createConversation: createConversationMutation.mutateAsync,
        isCreating: createConversationMutation.isPending
    };
};
