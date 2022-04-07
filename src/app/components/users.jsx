import React from "react";
import Pagination from "./pagination";
import User from "./user";

const Users = (props) => {
  const count = props.usersData.length;
  const pageSize = 4;
  const handlePageChange = (pageIndex) => {
    console.log("page: ", pageIndex);
  };

  if (count === 0) return null;

  return (
    <>
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
