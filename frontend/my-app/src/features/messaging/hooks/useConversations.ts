import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingApi } from '../services/messagingApi';
import { useSocket } from './useSocket';
import { useEffect } from 'react';
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

    // Real-time updates for conversation list
    useEffect(() => {
        if (!socket || !user) return;

        const handleConversationUpdated = () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        };
        
        const handleNewMessage = () => {
            // Also invalidate conversations if a new message arrives, to update "last message"
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        };

        socket.on('conversationUpdated', handleConversationUpdated);
        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('conversationUpdated', handleConversationUpdated);
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, user, queryClient]);

    return {
        conversations,
        isLoading,
        createConversation: createConversationMutation.mutateAsync,
        isCreating: createConversationMutation.isPending
    };
};
