import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.title}
              width={200}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}