import React, { useState, useEffect } from 'react';
import Pagination from '../../common/pagination';
import UsersTable from '../../ui/usersTable';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import api from '../../../api';
import _ from 'lodash';
import SearchField from '../../ui/searchField';
import { useUser } from '../../../hooks/useUsers';

const UsersListPage = () => {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [searchValue, setSearchValue] = useState('');

  const { users } = useUser();
  console.log(users);

  const handleDelete = (id) => {
    // setUsers((prevState) => prevState.filter((user) => user._id !== id));
    console.log(id);
  };

  const handleToggleBookmark = (id) => {
    const updatedState = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }

      return user;
    });

    // setUsers(updatedState);
    console.log(updatedState);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchValue]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    clearSearchField();
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSortClick = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  const handleChangeSearch = ({ target }) => {
    setSearchValue(target.value);
    clearFilter();
  };

  const searchUser = () => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  };

  const clearSearchField = () => {
    setSearchValue('');
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchUser() || users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
          <SearchField
            value={searchValue}
            onChange={handleChangeSearch}
            onClear={clearSearchField}
          />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSortClick}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
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
  }
  return 'Loding...';
};

export default UsersListPage;
