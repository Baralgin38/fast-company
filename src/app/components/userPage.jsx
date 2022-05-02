import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import UserCard from './userCard';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getUserById(userId).then((userData) => setUser(userData));
  }, []);

  console.log(user);
  return (
    <>
      {user ? (
        <UserCard userData={user} />
      ) : (
        <p className="m-2">Loading user data...</p>
      )}
    </>
  );
};

export default UserPage;

UserPage.propTypes = {
  userId: PropTypes.string
};
