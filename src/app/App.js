import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  return (
    <>
      <SearchStatus peopleNumber={users.length} />
      <Users usersData={users} onDelete={handleDelete} />
    </>
  );
};

export default App;
