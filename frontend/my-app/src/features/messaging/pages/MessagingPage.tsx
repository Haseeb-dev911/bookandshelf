import React from 'react';
import { useParams } from 'react-router-dom';
import { ConversationList } from '../components/ConversationList';
import { ChatWindow } from '../components/ChatWindow';

export const MessagingPage: React.FC = () => {
    const { conversationId } = useParams();

    return (
        <div className="flex h-[calc(100vh-140px)] w-full max-w-[1280px] mx-auto rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 bg-white overflow-hidden mb-10">
            {/* Sidebar: Conversation List */}
            <div className={`w-full md:w-[350px] lg:w-[400px] border-r border-gray-100 h-full bg-[#faf9f7] ${conversationId ? 'hidden md:block' : 'block'}`}>
                <ConversationList />
            </div>

            {/* Main Area: Chat Window */}
            <div className={`flex-1 h-full bg-white ${conversationId ? 'block' : 'hidden md:block'}`}>
                {conversationId ? (
                    <ChatWindow conversationId={conversationId} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-[#fdfdfc]">
                        <div className="w-24 h-24 mb-6 rounded-full bg-[#f4ece3] flex items-center justify-center shadow-sm">
                            <svg className="w-12 h-12 text-[#8b5e3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-serif font-semibold text-gray-800 tracking-tight">Your Messages</h2>
                        <p className="mt-3 text-center max-w-sm text-gray-500 text-sm leading-relaxed">Select a conversation from the sidebar to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
