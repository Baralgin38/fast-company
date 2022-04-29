import React from 'react';

const NavBar = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active">Main</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active">Login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active">Users</a>
      </li>
    </ul>
  );
};

export default NavBar;
