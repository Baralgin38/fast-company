import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const handleClickBookmark = (id) => {
    const updatedState = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user;
      }

      return user;
    });

    setUsers(updatedState);
  };

  return (
    <>
      <SearchStatus peopleNumber={users.length} />
      <Users
        usersData={users}
        onDelete={handleDelete}
        onClickBookmark={handleClickBookmark}
      />
    </>
  );
};

export default App;
