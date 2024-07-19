import React, { useState, useEffect } from 'react';
import css from './MovieDetails.module.css';
import styled from 'styled-components';
import axios from 'axios';
import {
  useParams,
  NavLink,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: red;
  }
`;

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();

  const API_KEY = 'ecfadc1d9b2290d9331728c2ab535e58';
  const API_URL = 'https://api.themoviedb.org/3';

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
    fetchMovieDetails();
  }, [movieId]);

  //   const fetchMovieDetails = useCallback(async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
  //       );
  //       setMovieDetails(response.data);
  //     } catch (error) {
  //       console.error('Error al obtener detalles de la película:', error);
  //     }
  //   }, [movieId]);

  //   useEffect(() => {
  //     fetchMovieDetails();
  //   }, [fetchMovieDetails]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className={css.movieDetails}>
        <div>
          {movieDetails.poster_path && (
            <img
              className={css.Movieimg}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          )}
        </div>
        <div className={css.movieinfo}>
          <h2>{`${movieDetails.title} (${
            movieDetails.release_date ? movieDetails.release_date : 'N/A'
          })`}</h2>
          <p className={css.movietext}>
            <strong>User Score:</strong> {movieDetails.vote_average}
          </p>
          <p className={css.movietext}>
            <strong>Overview:</strong> <br />
            {movieDetails.overview}
          </p>
          <p className={css.movietext}>
            <strong>Genres: </strong>
            <br />
            {movieDetails.genres &&
              movieDetails.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <div>
        <ul className={css.movienavlink}>
          <h2>Additional Information</h2>
          <li>
            <StyledLink to="cast">Cast</StyledLink>
          </li>
          <li>
            <StyledLink to="reviews">Reviews</StyledLink>
          </li>
        </ul>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetails;
