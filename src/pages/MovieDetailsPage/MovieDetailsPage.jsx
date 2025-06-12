import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies'); // ✅ useRef

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetchMovieDetails(movieId)

        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div>
      <Link to={backLinkRef.current}>🔙 Go back</Link>

      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <hr />

      <p>Additional Information:</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
