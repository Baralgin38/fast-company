import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  return (
    <form action="">
      <div>
        <label className="m-3" htmlFor="email">
          Email
        </label>
        <input type="text" id="email" value={email} onChange={handleChange} />
      </div>
      <div>
        <label className="m-3" htmlFor="password">
          Пароль
        </label>
        <input type="password" id="password" />
      </div>
    </form>
  );
};

export default Login;
