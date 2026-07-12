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
                "flex items-center gap-4 p-4 transition-all duration-300 border-l-[3px] hover:bg-white",
                isActive ? "bg-white border-[#8b5e3c] shadow-[0_2px_10px_rgb(0,0,0,0.02)]" : "border-transparent"
            )}
        >
            <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#f4ece3] flex items-center justify-center text-[#8b5e3c] font-medium text-lg overflow-hidden border border-white shadow-sm">
                    {otherUser.avatar ? (
                        <img src={otherUser.avatar} alt={otherUser.name} className="w-full h-full object-cover" />
                    ) : (
                        otherUser.name.charAt(0).toUpperCase()
                    )}
                </div>
                {otherUser.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-900 truncate tracking-tight text-[15px]">{otherUser.name}</h4>
                    {conversation.lastMessageAt && (
                        <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap ml-2 uppercase tracking-wider">
                            {new Date(conversation.lastMessageAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <p className={cn(
                        "text-[13px] truncate pr-2 tracking-wide",
                        isUnread ? "text-gray-900 font-semibold" : "text-gray-500 font-light"
                    )}>
                        {conversation.lastMessage || "No messages yet"}
                    </p>
                    {isUnread ? (
                        <div className="w-5 h-5 flex items-center justify-center bg-[#8b5e3c] text-white text-[10px] font-bold rounded-full shadow-sm shrink-0">
                            {conversation.unreadCount}
                        </div>
                    ) : null}
                </div>
            </div>
        </NavLink>
    );
};
