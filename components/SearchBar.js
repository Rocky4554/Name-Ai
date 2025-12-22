"use client";

import { Paperclip as PaperclipIcon, Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateChat } from "@/hooks/useChats";

const SUGGESTIONS = [
    "Tech startup domain",
    "E-commerce brand",
    "Creative agency name",
    "SaaS product domain",
];

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const { mutate: createChat, isPending } = useCreateChat();

    const handleSubmit = async () => {
        if (!query.trim() || isPending) return;

        const trimmedQuery = query.trim();

        try {
            createChat(
                { title: trimmedQuery, initialMessage: trimmedQuery },
                {
                    onSuccess: (chat) => {
                        router.push(`/dashboard/chat/${chat.id}?query=${encodeURIComponent(trimmedQuery)}`);
                    },
                    onError: (error) => {
                        console.error(error);
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between bg-card dark:bg-input rounded-full px-4 py-1 gap-x-4 border border-border">
                <button
                    className="hover:brightness-80 active:brightness-90 cursor-pointer shrink-0"
                    aria-label="attach file"
                >
                    <PaperclipIcon width={18} height={18} />
                </button>

                <textarea
                    className="w-full font-light resize-none p-[15px] max-h-[50px] overflow-y-auto border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-center text-center outline-none"
                    placeholder="Describe your idea.."
                    rows={1}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isPending}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !isPending) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />

                <button
                    className="bg-primary/10 hover:bg-primary/20 rounded-full p-2 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    aria-label="send message"
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    <Send width={20} height={20} />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => setQuery(suggestion)}
                        className="bg-transparent border border-border hover:border-primary hover:bg-primary/5 px-4 py-2 text-sm rounded-full transition-all duration-200 ease-in-out"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
}
