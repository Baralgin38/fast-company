import React, { useState } from 'react';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <form action="">
      <div>
        <label className="m-3" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={data.email}
          onChange={handleChange}
          name="email"
        />
      </div>
      <div>
        <label className="m-3" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={data.password}
          name="password"
        />
      </div>
    </form>
  );
};

export default Login;
