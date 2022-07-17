import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import EditUserPage from '../components/page/editUserPage';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            <EditUserPage userId={userId} />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default Users;
