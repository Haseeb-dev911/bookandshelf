import React from 'react';
import { NavLink } from 'react-router-dom';
import { Conversation } from '../types/messaging.types';
import { cn } from '@/lib/utils';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

interface ConversationCardProps {
    conversation: Conversation;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({ conversation }) => {
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;
    const otherUser = conversation.otherUser;

    const isUnread = conversation.lastMessageSender !== user?.id && conversation.unreadCount && conversation.unreadCount > 0;

    return (
        <NavLink
            to={`/messages/${conversation.id}`}
            className={({ isActive }) => cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent hover:bg-muted/50",
                isActive ? "bg-muted border-border" : "bg-card"
            )}
        >
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden border border-border">
                    {otherUser.avatar ? (
                        <img src={otherUser.avatar} alt={otherUser.name} className="w-full h-full object-cover" />
                    ) : (
                        otherUser.name.charAt(0).toUpperCase()
                    )}
                </div>
                {otherUser.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-foreground truncate">{otherUser.name}</h4>
                    {conversation.lastMessageAt && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {new Date(conversation.lastMessageAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <p className={cn(
                        "text-sm truncate pr-2",
                        isUnread ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                        {conversation.lastMessage || "No messages yet"}
                    </p>
                    {isUnread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                </div>
            </div>
        </NavLink>
    );
};
