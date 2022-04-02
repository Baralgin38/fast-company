import React from "react";
import Quality from "./quality";

const User = (props) => {
  const users = props.usersData.map((user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{<Quality qualities={user.qualities} />}</td>
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
