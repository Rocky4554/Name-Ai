"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchView = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="search-view">
            <h2>Search Your Chats</h2>
            <div className="search-container">
                <Search size={24} />
                <input
                    type="text"
                    placeholder="Search through all your conversations..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input-large"
                />
            </div>
            <p className="search-hint">Try searching for topics, domains, or specific questions</p>
        </div>
    );
};

export default SearchView;
