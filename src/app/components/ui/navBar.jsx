import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './navProfile';

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link">
              Main
            </NavLink>
          </li>
          {currentUser && (
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
