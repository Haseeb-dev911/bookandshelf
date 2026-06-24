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
            "flex w-full mt-2 space-x-3 max-w-xs md:max-w-md",
            isMine ? "ml-auto justify-end" : ""
        )}>
            <div className={cn(
                "p-3 rounded-2xl relative",
                isMine ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"
            )}>
                <p className="text-sm">{message.content}</p>
                <div className={cn(
                    "flex items-center gap-1 mt-1 justify-end",
                    isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                    <span className="text-[10px]">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isMine && (
                        <span className="text-[10px] ml-1">
                            {message.isRead ? '✓✓' : '✓'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
