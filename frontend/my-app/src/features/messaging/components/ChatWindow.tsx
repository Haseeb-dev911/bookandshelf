import React, { useState, useEffect, useRef } from 'react';
import { useMessages } from '../hooks/useMessages';
import { MessageBubble } from './MessageBubble';
import { Send, Loader2 } from 'lucide-react';

import { api } from '../../../services/apiClient';

interface ChatWindowProps {
    conversationId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
    const { messages, isLoading, sendMessage, isSending } = useMessages(conversationId);
    const [content, setContent] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [receiverName, setReceiverName] = useState('Loading...');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch conversation details to get receiver info
    useEffect(() => {
        const fetchConv = async () => {
            try {
                const res = await api.get(`/messages/conversations/${conversationId}`);
                const conv = res.data.payload;
                setReceiverId(conv.otherUser.id);
                setReceiverName(conv.otherUser.name);
            } catch (err) {
                console.error("Failed to fetch conv", err);
            }
        };
        fetchConv();
    }, [conversationId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !receiverId) return;

        sendMessage({ conversationId, receiverId, content });
        setContent('');
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background">
            {/* Header */}
            <div className="p-4 border-b border-border bg-card flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {receiverName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-semibold">{receiverName}</h3>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-muted/20 scrollbar-thin">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                        No messages yet. Send a message to start the conversation!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border">
                <form onSubmit={handleSend} className="flex gap-2 relative">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-muted border border-border rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        disabled={!content.trim() || isSending}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50 transition-transform active:scale-95"
                    >
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </form>
            </div>
        </div>
    );
};
