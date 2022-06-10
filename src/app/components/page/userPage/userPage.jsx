import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getUserById(userId).then((userData) => setUser(userData));
  }, []);

  return (
    <>
      {user ? (
        <div className="container mt-4">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard
                name={user.name}
                profession={user.profession.name}
                rate={user.rate}
              />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard meetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <Comments />
            </div>
          </div>
        </div>
      ) : (
        <p className="m-2">Loading user data...</p>
      )}
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
