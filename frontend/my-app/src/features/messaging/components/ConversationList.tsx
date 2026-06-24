import React from 'react';
import { useConversations } from '../hooks/useConversations';
import { ConversationCard } from './ConversationCard';
import { Search } from 'lucide-react';

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
        <div className="flex flex-col h-full bg-card border-r border-border">
            <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold mb-4 text-foreground">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-muted/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
                {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                        <p>No conversations yet.</p>
                        <p className="text-sm mt-2">Start a chat from an Old Book product page.</p>
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
