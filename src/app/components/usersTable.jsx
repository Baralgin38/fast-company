import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

const UsersTable = ({ users, onSort, currentSort, ...rest }) => {
  const handleSortClick = (item) => {
    if (currentSort.iter === item) {
      onSort((currentSort) => ({
        ...currentSort,
        order: currentSort.order === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      onSort({ iter: item, order: 'asc' });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() => handleSortClick('name')}
            scope="col"
            role={'button'}
          >
            Имя
          </th>
          <th scope="col">Качества</th>
          <th
            onClick={() => handleSortClick('profession.name')}
            scope="col"
            role={'button'}
          >
            Профессия
          </th>
          <th
            onClick={() => handleSortClick('completedMeetings')}
            scope="col"
            role={'button'}
          >
            Встретился, раз
          </th>
          <th
            onClick={() => handleSortClick('rate')}
            scope="col"
            role={'button'}
          >
            Оценка
          </th>
          <th
            onClick={() => handleSortClick('bookmark')}
            scope="col"
            role={'button'}
          >
            Избранное
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...rest} {...user} />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired
};

export default UsersTable;
