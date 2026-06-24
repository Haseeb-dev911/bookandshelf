import React from 'react';
import { useParams } from 'react-router-dom';
import { ConversationList } from '../components/ConversationList';
import { ChatWindow } from '../components/ChatWindow';

export const MessagingPage: React.FC = () => {
    const { conversationId } = useParams();

    return (
        <div className="flex h-[calc(100vh-80px)] mt-[80px] bg-background w-full max-w-7xl mx-auto rounded-xl shadow-sm border border-border overflow-hidden">
            {/* Sidebar: Conversation List */}
            <div className={`w-full md:w-1/3 lg:w-1/4 h-full ${conversationId ? 'hidden md:block' : 'block'}`}>
                <ConversationList />
            </div>

            {/* Main Area: Chat Window */}
            <div className={`flex-1 h-full ${conversationId ? 'block' : 'hidden md:block'}`}>
                {conversationId ? (
                    <ChatWindow conversationId={conversationId} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                        <div className="w-20 h-20 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-foreground">Your Messages</h2>
                        <p className="mt-2 text-center max-w-xs">Select a conversation from the left to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
