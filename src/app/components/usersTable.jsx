import React from 'react';
import PropTypes from 'prop-types';
import Table from './table';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import { Link } from 'react-router-dom';

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          delete
        </button>
      )
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
