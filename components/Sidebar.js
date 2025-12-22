"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Plus, Search, MessageSquare, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useChats } from '@/hooks/useChats';

const Sidebar = ({ isCollapsed, onToggle }) => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const { data: chats, isLoading } = useChats();

    // Get recent chats (limit to 5)
    const recentChats = chats?.slice(0, 5) || [];

    const isActive = (path) => pathname === path;

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {/* Header */}
            <div className="sidebar-header">
                {!isCollapsed && <h1 className="sidebar-logo">Name.AI</h1>}
                <button onClick={onToggle} className="sidebar-toggle-btn">
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* New Chat Button */}
            <Link href="/dashboard" className="new-chat-btn">
                <Plus size={20} />
                {!isCollapsed && <span>New chat</span>}
            </Link>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <Link
                    href="/dashboard/chats"
                    className={`nav-item ${isActive('/dashboard/chats') ? 'active' : ''}`}
                >
                    <MessageSquare size={20} />
                    {!isCollapsed && <span>Chats</span>}
                </Link>

                <Link
                    href="/dashboard/search"
                    className={`nav-item ${isActive('/dashboard/search') ? 'active' : ''}`}
                >
                    <Search size={20} />
                    {!isCollapsed && <span>Search Chats</span>}
                </Link>
            </nav>

            {/* Recents Section */}
            {!isCollapsed && (
                <div className="sidebar-recents">
                    <h3 className="recents-title">Recents</h3>
                    <div className="recents-list">
                        {recentChats.map(chat => (
                            <button
                                key={chat.id}
                                className="recent-item"
                                // For demo, just going to dashboard, could be /dashboard/chat/[id]
                                onClick={() => window.location.href = '/dashboard'}
                            >
                                <div className="recent-item-content">
                                    <p className="recent-item-title">{chat.title}</p>
                                    <span className="recent-item-date">{chat.date}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* User Profile */}
            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar">
                        {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
                    </div>
                    {!isCollapsed && (
                        <div className="user-info">
                            <p className="user-name">{session?.user?.name || 'User'}</p>
                            <p className="user-plan">Free plan</p>
                        </div>
                    )}
                </div>
                <button className="logout-btn" onClick={() => signOut()} title="Logout">
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;