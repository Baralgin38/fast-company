import React, { useState } from 'react';
import TextField from '../components/textField';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <form action="">
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
    </form>
  );
};

export default Login;
