import React from 'react';
import { Link } from 'react-router-dom';
import { useConversations } from '../hooks/useConversations';
import { ConversationCard } from './ConversationCard';
import { Search, ArrowLeft } from 'lucide-react';

export const ConversationList: React.FC = () => {
    const { conversations, isLoading } = useConversations();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 p-2 animate-pulse">
                        <div className="w-12 h-12 bg-muted rounded-full"></div>
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                            <div className="h-3 bg-muted rounded w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-transparent">
            <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                {/* Back to homepage */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400 hover:text-[#8b5e3c] transition-colors mb-4 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Home
                </Link>
                <h2 className="text-2xl font-serif font-bold mb-5 text-gray-900 tracking-tight">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-[14px] text-gray-700 focus:outline-none focus:border-[#8b5e3c] focus:ring-1 focus:ring-[#8b5e3c] transition-all shadow-sm placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
                {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
                        <p className="font-medium text-gray-500">No conversations yet.</p>
                        <p className="text-sm mt-1">Start a chat from a book page.</p>
                    </div>
                ) : (
                    conversations.map(conv => (
                        <ConversationCard key={conv.id} conversation={conv} />
                    ))
                )}
            </div>
        </div>
    );
};
