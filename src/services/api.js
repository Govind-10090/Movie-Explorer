import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const getTrendingMovies = async (page = 1) => {
    const response = await api.get('/trending/movie/week', {
        params: { page },
    });
    return response.data.results;
};

export const searchMovies = async (query, page = 1) => {
    const response = await api.get('/search/movie', {
        params: { query, page },
    });
    return response.data.results;
};

export const getMovieDetails = async (id) => {
    const response = await api.get(`/movie/${id}`, {
        params: { append_to_response: 'credits,similar' },
    });
    return response.data;
};

export const getGenres = async () => {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
};

export const discoverMovies = async ({ genreId, minRating, page = 1 }) => {
    const params = {
        page,
        sort_by: 'popularity.desc',
    };

    if (genreId) params.with_genres = genreId;
    if (minRating) params['vote_average.gte'] = minRating;

    const response = await api.get('/discover/movie', { params });
    return response.data.results;
};

export const getImageUrl = (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
