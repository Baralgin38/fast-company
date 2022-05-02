import React from 'react';
import PropTypes from 'prop-types';
import QualitiesList from './qualitiesList';
import { useHistory } from 'react-router-dom';

const UserCard = ({ userData }) => {
  const history = useHistory();

  const allUsersBtnClickHandler = () => {
    history.push('/users');
  };

  return (
    <>
      <div className="m-2">
        <h1>Имя: {userData.name}</h1>
        <h2>Профессия: {userData.profession.name}</h2>
        <p>
          Личные качества: {<QualitiesList qualities={userData.qualities} />}
        </p>
        <p>Встретился, раз: {userData.completedMeetings}</p>
        <p>Оценка: {userData.rate}</p>
      </div>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={allUsersBtnClickHandler}
      >
        Все пользователи
      </button>
    </>
  );
};

UserCard.propTypes = {
  userData: PropTypes.object.isRequired
};

export default UserCard;
