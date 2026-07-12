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
        <div className="flex-1 flex flex-col h-full bg-[#fdfdfc]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center gap-4 shadow-sm relative z-10">
                {/* Back Button — visible on all screens */}
                <button 
                    onClick={() => window.history.back()} 
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="w-11 h-11 rounded-full bg-[#f4ece3] flex items-center justify-center text-[#8b5e3c] font-medium text-lg border border-white shadow-sm shrink-0">
                    {receiverName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 tracking-tight text-[15px]">{receiverName}</h3>
                    <p className="text-[11px] font-medium text-green-500 uppercase tracking-wider">Online</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f6] scrollbar-thin">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500 font-medium">
                        Send a message to start the conversation!
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="flex gap-3 relative max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-[#fbf9f6] border border-gray-200 rounded-full py-3.5 pl-6 pr-14 text-[14px] text-gray-700 focus:outline-none focus:border-[#8b5e3c] focus:ring-1 focus:ring-[#8b5e3c] transition-all shadow-sm placeholder-gray-400"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        disabled={!content.trim() || isSending}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#8b5e3c] hover:bg-[#724a2f] text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-all active:scale-95 shadow-md"
                    >
                        {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                    </button>
                </form>
            </div>
        </div>
    );
};
