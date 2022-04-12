import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import User from './user';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import api from '../api';

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleProfessionSelect = (param) => {
    console.log(param);
  };
  console.log(professions);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      <GroupList items={professions} onItemSelect={handleProfessionSelect} />
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        itemsCountOnPage={userCrop.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Users;
