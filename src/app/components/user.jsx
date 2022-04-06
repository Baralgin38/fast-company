import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = (props) => {
  const { user, onDelete, onClickBookmark } = props;

  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <Bookmark user={user} onClickBookmark={onClickBookmark} />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
