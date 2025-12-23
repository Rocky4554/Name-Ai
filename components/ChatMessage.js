// Chat Message Component
'use client';

import { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, RefreshCw, MoreVertical } from 'lucide-react';

export default function ChatMessage({
    message,
    isUser = false,
    isLoading = false,
    showActions = true
}) {
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'up' or 'down'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleFeedback = (type) => {
        setFeedback(feedback === type ? null : type);
        // Here you would send feedback to your API
        console.log(`Feedback: ${type} for message ${message.id}`);
    };

    const handleRegenerate = () => {
        // Trigger message regeneration
        console.log('Regenerate message');
    };

    return (
        <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            {/* Assistant Avatar */}
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    AI
                </div>
            )}

            {/* Message Content */}
            <div className={`flex-1 max-w-3xl ${isUser ? 'flex flex-col items-end' : ''}`}>
                {/* Message Bubble */}
                <div
                    className={`
            rounded-2xl px-4 py-3
            ${isUser
                            ? 'bg-primary text-primary-foreground ml-12'
                            : 'bg-card border border-border'
                        }
          `}
                >
                    {isLoading ? (
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="whitespace-pre-wrap leading-relaxed m-0">
                                {message.content}
                            </p>
                        </div>
                    )}
                </div>

                {/* Message Actions (for assistant messages only) */}
                {!isUser && !isLoading && showActions && (
                    <div className="flex items-center gap-1 mt-2 px-2">
                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
                            aria-label="Copy message"
                            title="Copy message"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>

                        {/* Thumbs Up */}
                        <button
                            onClick={() => handleFeedback('up')}
                            className={`p-1.5 hover:bg-accent rounded-md transition-colors ${feedback === 'up'
                                    ? 'text-green-500'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            aria-label="Good response"
                            title="Good response"
                        >
                            <ThumbsUp size={16} fill={feedback === 'up' ? 'currentColor' : 'none'} />
                        </button>

                        {/* Thumbs Down */}
                        <button
                            onClick={() => handleFeedback('down')}
                            className={`p-1.5 hover:bg-accent rounded-md transition-colors ${feedback === 'down'
                                    ? 'text-red-500'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            aria-label="Bad response"
                            title="Bad response"
                        >
                            <ThumbsDown size={16} fill={feedback === 'down' ? 'currentColor' : 'none'} />
                        </button>

                        {/* Regenerate */}
                        <button
                            onClick={handleRegenerate}
                            className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
                            aria-label="Regenerate response"
                            title="Regenerate response"
                        >
                            <RefreshCw size={16} />
                        </button>

                        {/* More Options */}
                        <button
                            className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
                            aria-label="More options"
                            title="More options"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {/* Timestamp */}
                        {message.timestamp && (
                            <span className="ml-auto text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        )}
                    </div>
                )}

                {/* User Message Timestamp */}
                {isUser && message.timestamp && (
                    <span className="text-xs text-muted-foreground mt-1 px-2">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                )}
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center font-semibold text-sm">
                    U
                </div>
            )}
        </div>
    );
}