import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Outlet } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  const API_KEY = 'ecfadc1d9b2290d9331728c2ab535e58';
  const API_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
        );

        setReviews(response.data.results);
      } catch (error) {
        console.error('Error al obtener reseñas de la película:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reseñas</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>no hay reseñas</p>
      )}
      <Outlet />
    </div>
  );
};

export default Reviews;
