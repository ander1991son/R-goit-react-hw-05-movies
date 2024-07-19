import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// import Home from './Home/Home';
// import Navbar from './Navbar/Navbar';
// import Movies from './Movies/Movies';
// import MovieDetails from './MovieDetails/MovieDetails';
// import Reviews from './Reviews/Reviews';
// import Cast from './Cast/Cast';

const Home = lazy(() => import('./Home/Home'));
const Navbar = lazy(() => import('./Navbar/Navbar'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Cast = lazy(() => import('./Cast/Cast'));

export const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId/*" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
