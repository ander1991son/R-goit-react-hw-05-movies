import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

const Movies = () => {
  const API_KEY = 'ecfadc1d9b2290d9331728c2ab535e58';
  const API_URL = 'https://api.themoviedb.org/3';
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [API_KEY, API_URL, movieId]);

  useEffect(() => {
    // Lógica para obtener películas populares al cargar el componente...
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${API_URL}/movie/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error al obtener películas populares:', error);
      }
    };

    fetchPopularMovies();
  }, [API_KEY, API_URL]);

  // Función para manejar cambios en la barra de búsqueda
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  //Función para realizar la búsqueda
  const searchMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div>
      <h1>Películas Populares</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={searchMovies}>Buscar</button>
      </div>
      <ul>
        {searchQuery
          ? searchResults.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))
          : movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
      </ul>
      <div>
        <div>
          {movieDetails.poster_path && (
            <img
              width="100px"
              height="100px"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          )}
        </div>
        <h2>{movieDetails.title}</h2>
        <p>{movieDetails.overview}</p>
      </div>
    </div>
  );
};

export default Movies;
