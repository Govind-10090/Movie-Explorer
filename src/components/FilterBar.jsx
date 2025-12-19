import React, { useEffect, useState } from 'react';
import { getGenres } from '../services/api';
import { Filter, Star } from 'lucide-react';

const FilterBar = ({ onFilterChange, className = '' }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [minRating, setMinRating] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                console.error('Failed to fetch genres', error);
            }
        };
        fetchGenres();
    }, []);

    const handleGenreChange = (e) => {
        const value = e.target.value;
        setSelectedGenre(value);
        onFilterChange({ genreId: value, minRating });
    };

    const handleRatingChange = (e) => {
        const value = e.target.value;
        setMinRating(value);
        onFilterChange({ genreId: selectedGenre, minRating: value });
    };

    return (
        <div className={`flex flex-col md:flex-row gap-4 items-center ${className}`}>
            <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="bg-gray-800 text-white pl-10 pr-8 py-2 rounded-lg border border-gray-700 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer min-w-[150px]"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="relative">
                <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                    value={minRating}
                    onChange={handleRatingChange}
                    className="bg-gray-800 text-white pl-10 pr-8 py-2 rounded-lg border border-gray-700 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer min-w-[150px]"
                >
                    <option value="">Any Rating</option>
                    <option value="5">5+ Stars</option>
                    <option value="6">6+ Stars</option>
                    <option value="7">7+ Stars</option>
                    <option value="8">8+ Stars</option>
                    <option value="9">9+ Stars</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
