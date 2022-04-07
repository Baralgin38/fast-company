import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const handleToggleBookmark = (id) => {
    const updatedState = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }

      return user;
    });

    setUsers(updatedState);
  };

  return (
    <>
      <SearchStatus peopleNumber={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  );
};

export default App;
