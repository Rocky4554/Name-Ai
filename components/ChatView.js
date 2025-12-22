"use client";

import React, { useState } from 'react';
import ChatInput from './ChatInput';

const ChatView = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'assistant', content: 'Hello! I\'m Name.AI. I can help you find the perfect domain name for your project. What are you looking for today?' }
    ]);

    const handleSend = (message) => {
        setMessages(prev => [...prev,
        { id: prev.length + 1, type: 'user', content: message },
        { id: prev.length + 2, type: 'assistant', content: 'I\'m processing your request. In a real app, I would search for available domains based on your query: "' + message + '"' }
        ]);
    };

    return (
        <div className="chat-view">
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.type}`}>
                        <div className="message-avatar">
                            {msg.type === 'assistant' ? 'AI' : 'U'}
                        </div>
                        <div className="message-content">
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <ChatInput onSend={handleSend} />
        </div>
    );
};

export default ChatView;
