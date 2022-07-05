import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../../hooks/useUsers';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';
import { CommentsProvider } from '../../../hooks/useComments';

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);
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
                image={user.image}
                _id={user._id}
              />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard meetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <CommentsProvider>
                <Comments />
              </CommentsProvider>
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
