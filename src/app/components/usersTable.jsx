import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

const UsersTable = ({ users, onSort, ...rest }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort('name')} scope="col" role={'button'}>
            Имя
          </th>
          <th scope="col">Качества</th>
          <th
            onClick={() => onSort('profession.name')}
            scope="col"
            role={'button'}
          >
            Профессия
          </th>
          <th
            onClick={() => onSort('completedMeetings')}
            scope="col"
            role={'button'}
          >
            Встретился, раз
          </th>
          <th onClick={() => onSort('rate')} scope="col" role={'button'}>
            Оценка
          </th>
          <th onClick={() => onSort('bookmark')} scope="col" role={'button'}>
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
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
