"use client";

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function DashboardLayout({ children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <div className="app-container">
                        <Sidebar
                            isCollapsed={isSidebarCollapsed}
                            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        // currentView props removed as we use routing now
                        />

                        <main className={`main-content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                            <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

                            <div className="content-area">
                                {children}
                            </div>
                        </main>
                        {/* Mobile sidebar overlay or logic could be added here if needed for mobile menu */}
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
