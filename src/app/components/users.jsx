import React from "react";
import User from "./user";

const Users = (props) => {
  const renderTable = () => {
    if (props.usersData.length !== 0) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {props.usersData.map((user) => (
              <User
                key={user._id}
                user={user}
                onDelete={props.onDelete}
                onClickBookmark={props.onClickBookmark}
              />
            ))}
          </tbody>
        </table>
      );
    }
  };

  return <>{renderTable()}</>;
};

export default Users;
