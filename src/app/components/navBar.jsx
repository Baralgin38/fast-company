import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">
          Main
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/users" className="nav-link">
          Users
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
