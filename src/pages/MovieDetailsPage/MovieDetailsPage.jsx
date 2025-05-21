import { useEffect, useState, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import css from './MovieDetailsPage.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main className={css.main}>
      <Link to={backLink} className={css.backLink}>← Go back</Link>

      <div className={css.details}>
        <img
          src={movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className={css.poster}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLink }}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
          </li>
        </ul>
      </div>

      <hr />

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
