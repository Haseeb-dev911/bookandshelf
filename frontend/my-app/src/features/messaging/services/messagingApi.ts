import { api } from '../../../services/apiClient';
import { Conversation, Message, SendMessagePayload } from '../types/messaging.types';

export const messagingApi = {
    getConversations: async (): Promise<Conversation[]> => {
        const response = await api.get('/messages/conversations');
        return response.data.payload;
    },

    getConversation: async (conversationId: string): Promise<Conversation> => {
        const response = await api.get(`/messages/conversations/${conversationId}`);
        return response.data.payload;
    },

    createConversation: async (receiverId: string): Promise<Conversation> => {
        const response = await api.post('/messages/conversations', { receiverId });
        return response.data.payload;
    },

    getMessages: async (conversationId: string): Promise<Message[]> => {
        const response = await api.get(`/messages/${conversationId}`);
        return response.data.payload;
    },

    sendMessage: async (payload: SendMessagePayload): Promise<Message> => {
        const response = await api.post('/messages', payload);
        return response.data.payload;
    },

    markMessagesAsRead: async (conversationId: string): Promise<void> => {
        await api.patch(`/messages/read/${conversationId}`);
    }
};
