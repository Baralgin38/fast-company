import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UserCard = ({ name, profession, rate, image, _id }) => {
  const history = useHistory();
  const { currentUser } = useAuth();

  const editBtnClickHandler = () => {
    history.push(history.location.pathname + '/edit');
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser._id === _id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={editBtnClickHandler}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={image} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{profession}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default UserCard;
