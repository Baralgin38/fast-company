import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderPhrase = (count) => {
    let classes = "badge m-2 ";

    const getDeclinationPrhase = (count) => {
      if (
        (count % 100 < 11 || count % 100 > 14) &&
        (count % 10 === 2 || count % 10 === 3 || count % 10 === 4)
      ) {
        return `человека тусанёт`;
      } else if (count % 100 === 1 || (count % 100) % 10 === 1) {
        return `человек тусанёт`;
      }

      return `человек тусанут`;
    };

    if (count === 0) {
      classes += "bg-danger";
      return (
        <span className={classes}>Никто с тобой сегодня не тусанёт :(</span>
      );
    }

    classes += "bg-primary";
    return (
      <span className={classes}>
        {count} {getDeclinationPrhase(count)} с тобой сегодня
      </span>
    );
  };

  const renderTable = () => {
    if (users.length === 0) return;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const {
              _id,
              name,
              profession,
              qualities,
              completedMeetings,
              rate,
            } = user;

            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>
                  {qualities.map(({ _id, name, color }) => {
                    const badgeClass = `badge bg-${color} m-1`;

                    return (
                      <span key={_id} className={badgeClass}>
                        {name}
                      </span>
                    );
                  })}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      {renderTable()}
    </>
  );
};

export default Users;
