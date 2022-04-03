import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = (props) => {
  const { user } = props;

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
        {<Bookmark user={user} onClickBookmark={props.onClickBookmark} />}
      </td>
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
};

export default User;
