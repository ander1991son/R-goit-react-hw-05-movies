import { Suspense } from 'react';
import styled from 'styled-components';
import css from './Navbar.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: red;
  }
`;

const Navbar = () => {
  return (
    <>
      <div className={css.NavLink}>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Navbar;
