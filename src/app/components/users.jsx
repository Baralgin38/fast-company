import React from "react";

const Users = (props) => {
  const renderPhrase = (count) => {
    let classes = "badge m-2 ";

    const getDeclinationPrhase = (count) => {
      if (
        (count % 100 < 11 || count % 100 > 14) &&
        (count % 10 === 2 || count % 10 === 3 || count % 10 === 4)
      ) {
        return "человека тусанёт";
      } else if (count % 100 === 1 || (count % 100) % 10 === 1) {
        return "человек тусанёт";
      }

      return "человек тусанут";
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
    if (props.usersData.length !== 0) {
      const { usersData } = props;

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
            {usersData.map((user) => {
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
            })}
          </tbody>
        </table>
      );
    }
  };

  return (
    <>
      <h2>{renderPhrase(props.usersData.length)}</h2>
      {renderTable()}
    </>
  );
};

export default Users;
