export interface User {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
    lastSeen?: string;
}

export interface Conversation {
    id: string;
    participantOne: string;
    participantTwo: string;
    lastMessage?: string;
    lastMessageAt?: string;
    lastMessageSender?: string;
    createdAt: string;
    updatedAt: string;
    otherUser: User;
    unreadCount?: number;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    isRead: boolean;
    readAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SendMessagePayload {
    conversationId: string;
    receiverId: string;
    content: string;
}
