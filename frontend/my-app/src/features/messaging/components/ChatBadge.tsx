import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleIcon } from 'lucide-react';
import { useConversations } from '../hooks/useConversations';
import { USER_ROUTES_PATH } from '../../../app/router/routes.path';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

export const ChatBadge: React.FC = () => {
    const { conversations } = useConversations();
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;

    const unreadCount = useMemo(() => {
        if (!user) return 0;
        return conversations.filter(c => c.lastMessageSender !== user.id && c.unreadCount && c.unreadCount > 0).length;
    }, [conversations, user]);

    return (
        <Link
            to={USER_ROUTES_PATH.messages}
            className="relative hover:text-mahogany transition-colors text-gray-600"
        >
            <MessageCircleIcon className="w-5 h-5" strokeWidth={1.5} />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                    {unreadCount}
                </span>
            )}
        </Link>
    );
};
