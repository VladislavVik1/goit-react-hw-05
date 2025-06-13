import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTZlZjIxMzBmMmFiZjVlODA0YWIzZDhiOGY5YWZhMCIsIm5iZiI6MTc0NzgxNDI1OS4wNjIsInN1YiI6IjY4MmQ4NzczOWMzOTJjMWU2MWY1NjdhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KvfhQzMhIVnxltC_4sPlzsApPm51QooNAxYYDrA3jsc',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMovieDetails(); // ✅ більше не зациклюється
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
