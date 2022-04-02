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
            {
              <User usersData={props.usersData} onDelete={props.onDelete} />
              /* {usersData.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map(({ _id, name, color }) => {
                      const badgeClass = `badge bg-${color} m-1`;

                      return (
                        <span key={_id} className={badgeClass}>
                          {name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.onDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })} */
            }
          </tbody>
        </table>
      );
    }
  };

  return <>{renderTable()}</>;
};

export default Users;
