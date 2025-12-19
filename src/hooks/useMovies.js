import { useState, useEffect, useCallback } from 'react';
import { getTrendingMovies, searchMovies, discoverMovies } from '../services/api';

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Filter states
    const [currentQuery, setCurrentQuery] = useState('');
    const [currentFilters, setCurrentFilters] = useState({ genreId: '', minRating: '' });

    const fetchMovies = useCallback(async (searchQuery = '', filters = { genreId: '', minRating: '' }, pageNum = 1) => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (searchQuery) {
                data = await searchMovies(searchQuery, pageNum);
            } else if (filters.genreId || filters.minRating) {
                data = await discoverMovies({ ...filters, page: pageNum });
            } else {
                data = await getTrendingMovies(pageNum);
            }

            setMovies(prev => pageNum === 1 ? data : [...prev, ...data]);
            setHasMore(data.length > 0);
        } catch (err) {
            setError(err.message || 'Failed to fetch movies');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchMovies();
    }, []);

    const search = (query) => {
        setCurrentQuery(query);
        setCurrentFilters({ genreId: '', minRating: '' }); // Reset filters on search
        setPage(1);
        setMovies([]);
        fetchMovies(query, { genreId: '', minRating: '' }, 1);
    };

    const filter = (newFilters) => {
        setCurrentFilters(newFilters);
        setCurrentQuery(''); // Reset search on filter
        setPage(1);
        setMovies([]);
        fetchMovies('', newFilters, 1);
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMovies(currentQuery, currentFilters, nextPage);
        }
    };

    return { movies, loading, error, search, filter, loadMore, hasMore };
};
