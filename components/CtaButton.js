"use client";

import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CtaButton({ className, ...props }) {
    const router = useRouter();

    return (
        <button
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group ${className || ''}`}
            onClick={() => router.push('/dashboard')}
            {...props}
        >
            <MessageSquare className="w-6 h-6" />
            <span className="font-semibold text-lg hidden group-hover:block animate-fade-in">Start Chatting</span>
        </button>
    );
}
