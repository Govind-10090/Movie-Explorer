import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getImageUrl } from '../services/api';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="group relative block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="aspect-[2/3] overflow-hidden">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-bold text-lg line-clamp-2">{movie.title}</p>
                    <div className="flex items-center gap-1 text-yellow-400 mt-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
