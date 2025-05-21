import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import css from './MovieCast.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  if (!cast.length) return <p>No cast available.</p>;

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.id} className={css.item}>
          <img
            src={actor.profile_path
              ? `${IMAGE_BASE_URL}${actor.profile_path}`
              : 'https://via.placeholder.com/100x150?text=No+Photo'}
            alt={actor.name}
          />
          <p>{actor.name}</p>
          <p className={css.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}