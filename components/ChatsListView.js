"use client";

import { useChats, useSearchChats } from '@/hooks/useChats';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function ChatsListView() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: allChats, isLoading } = useChats();
    const { data: searchResults } = useSearchChats(searchQuery);

    const chats = searchQuery ? searchResults : allChats;

    return (
        <div className="chats-list-view">
            <div className="chats-header">
                <h2>All Chats</h2>
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="chats-grid">
                    {chats?.map(chat => (
                        <Link href={`/dashboard/chat/${chat.id}`} key={chat.id}>
                            <div className="chat-card">
                                <h3>{chat.title}</h3>
                                <p className="chat-preview">{chat.preview || chat.lastMessage}</p>
                                <span className="chat-date">{new Date(chat.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}

                    {chats?.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No chats found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
