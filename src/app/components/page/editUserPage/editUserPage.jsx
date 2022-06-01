import React from 'react';
import PropTypes from 'prop-types';
import EditUserForm from '../../ui/editUserForm';

const EditUserPage = ({ userId }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditUserForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string
};

export default EditUserPage;
