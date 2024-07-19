import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();

  const API_KEY = 'ecfadc1d9b2290d9331728c2ab535e58';
  const API_URL = 'https://api.themoviedb.org/3';

  async function fetchPopularMovies() {
    try {
      const response = await axios.get(
        `${API_URL}/trending/all/day?api_key=${API_KEY}`
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error('Error al obtener películas populares:', error);
    }
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <p>{movie.title || movie.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
      {movieId}
    </div>
  );
};

export default Home;
