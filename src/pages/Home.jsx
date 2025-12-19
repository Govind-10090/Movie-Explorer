import React, { useEffect, useRef, useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Layout from '../components/Layout';

const Home = () => {
    const { movies, loading, error, search, filter, loadMore, hasMore } = useMovies();
    const observer = useRef();

    const lastMovieElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const handleSearch = (query) => {
        search(query);
    };

    const handleFilterChange = (filters) => {
        filter(filters);
    };

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-secondary to-purple-500 bg-clip-text text-transparent">
                        Discover Movies
                    </h1>
                    <p className="text-gray-400 text-lg">Find your next favorite film</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto items-stretch lg:items-center">
                    <SearchBar onSearch={handleSearch} className="w-full lg:w-64" />
                    <FilterBar onFilterChange={handleFilterChange} />
                </div>
            </div>

            {error && (
                <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg mb-8">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie, index) => {
                    if (movies.length === index + 1) {
                        return (
                            <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}>
                                <MovieCard movie={movie} />
                            </div>
                        );
                    } else {
                        return <MovieCard key={`${movie.id}-${index}`} movie={movie} />;
                    }
                })}
            </div>

            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="aspect-[2/3] bg-gray-800 rounded-xl animate-pulse" />
                    ))}
                </div>
            )}

            {!loading && movies.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No movies found. Try a different search or filter.
                </div>
            )}
        </Layout>
    );
};

export default Home;
