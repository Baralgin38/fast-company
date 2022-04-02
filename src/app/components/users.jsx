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
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {<User usersData={props.usersData} onDelete={props.onDelete} />}
          </tbody>
        </table>
      );
    }
  };

  return <>{renderTable()}</>;
};

export default Users;
