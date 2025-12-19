import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, className = '' }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative w-full max-w-md ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-full border border-gray-700 focus:border-secondary focus:ring-2 focus:ring-secondary/50 outline-none transition-all placeholder-gray-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
        </form>
    );
};

export default SearchBar;
