import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import UsersTable from './usersTable';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import api from '../api';

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  // const filteredUsers = selectedProf
  //   ? allUsers.filter(
  //       (user) =>
  //         JSON.stringify(user.profession) === JSON.stringify(selectedProf)
  //     )
  //   : allUsers;

  let filteredUsers = null;
  if (selectedProf) {
    filteredUsers = allUsers.filter(
      (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
    );
  } else {
    filteredUsers = allUsers;
  }

  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus peopleNumber={count} />
        {count > 0 && <UsersTable users={userCrop} {...rest} />}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            itemsCountOnPage={userCrop.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Users;
