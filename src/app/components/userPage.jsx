import React from 'react';
import PropTypes from 'prop-types';

const UserPage = ({ userId }) => {
  return <h1>{`Я карточка пользователя с id:${userId}`}</h1>;
};

export default UserPage;

UserPage.propTypes = {
  userId: PropTypes.string
};
