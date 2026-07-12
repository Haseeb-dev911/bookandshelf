import React from 'react';
import { Message } from '../types/messaging.types';
import { cn } from '@/lib/utils';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;
    const isMine = message.senderId === user?.id;

    return (
        <div className={cn(
            "flex w-full mt-3 max-w-[85%] md:max-w-[75%]",
            isMine ? "ml-auto justify-end" : ""
        )}>
            <div className={cn(
                "p-3.5 px-4 rounded-3xl relative shadow-sm border",
                isMine 
                    ? "bg-[#8b5e3c] text-white border-[#724a2f] rounded-tr-sm shadow-[0_2px_10px_rgba(139,94,60,0.15)]" 
                    : "bg-white text-gray-800 border-gray-100 rounded-tl-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            )}>
                <p className="text-[14.5px] leading-relaxed font-sans">{message.content}</p>
                <div className={cn(
                    "flex items-center gap-1 mt-1.5 justify-end",
                    isMine ? "text-white/80" : "text-gray-400"
                )}>
                    <span className="text-[10px] font-medium tracking-wide">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isMine && (
                        <span className="text-[10px] ml-1 tracking-tighter">
                            {message.isRead ? '✓✓' : '✓'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
