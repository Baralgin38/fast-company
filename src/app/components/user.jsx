import React from "react";

const User = (props) => {
  const users = props.usersData.map((user) => {
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
  });

  return users;
};

export default User;
