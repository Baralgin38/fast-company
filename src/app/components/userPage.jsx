import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getUserById(userId).then((userData) => setUser(userData));
  }, []);

  console.log(user);
  return (
    <>
      {user ? (
        <h2>{`I'm ${user.name} with id: ${user._id}`}</h2>
      ) : (
        'Loading user data...'
      )}
    </>
  );
};

export default UserPage;

UserPage.propTypes = {
  userId: PropTypes.string
};
