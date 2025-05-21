// services/api.js
import axios from 'axios';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTZlZjIxMzBmMmFiZjVlODA0YWIzZDhiOGY5YWZhMCIsIm5iZiI6MTc0NzgxNDI1OS4wNjIsInN1YiI6IjY4MmQ4NzczOWMzOTJjMWU2MWY1NjdhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KvfhQzMhIVnxltC_4sPlzsApPm51QooNAxYYDrA3jsc';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: TOKEN,
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    ...options,
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return data.results;
};

export const fetchMovieDetails = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return data;
};

export const fetchMovieCast = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return data.cast;
};

export const fetchMovieReviews = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return data.results;
};
