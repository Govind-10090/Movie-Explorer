import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/api';
import Layout from '../components/Layout';
import { Star, Calendar, Clock, ArrowLeft } from 'lucide-react';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="animate-pulse">
                    <div className="h-[400px] bg-gray-800 rounded-xl mb-8" />
                    <div className="h-8 bg-gray-800 w-1/2 mb-4 rounded" />
                    <div className="h-4 bg-gray-800 w-full mb-2 rounded" />
                    <div className="h-4 bg-gray-800 w-full mb-2 rounded" />
                </div>
            </Layout>
        );
    }

    if (error || !movie) {
        return (
            <Layout>
                <div className="text-center text-red-500 mt-10">{error || 'Movie not found'}</div>
                <div className="text-center mt-4">
                    <Link to="/" className="text-secondary hover:underline">Back to Home</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Search
            </Link>

            <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                {/* Backdrop */}
                <div className="absolute inset-0">
                    <img
                        src={getImageUrl(movie.backdrop_path, 'original')}
                        alt="Backdrop"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                </div>

                <div className="relative p-6 md:p-10 flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0 w-64 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-xl text-gray-400 italic mb-6">{movie.tagline}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 text-sm md:text-base">
                            <div className="flex items-center gap-2 text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="w-5 h-5" />
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Clock className="w-5 h-5" />
                                <span>{movie.runtime} min</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                            {movie.genres.map(g => (
                                <span key={g.id} className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-secondary">Overview</h3>
                            <p className="text-gray-300 leading-relaxed max-w-3xl">{movie.overview}</p>
                        </div>

                        {/* Cast (Simplified) */}
                        {movie.credits && movie.credits.cast && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-secondary">Top Cast</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {movie.credits.cast.slice(0, 5).map(actor => (
                                        <div key={actor.id} className="text-center w-24">
                                            <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/10">
                                                <img
                                                    src={getImageUrl(actor.profile_path, 'w200')}
                                                    alt={actor.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="text-xs font-medium truncate">{actor.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MovieDetails;
