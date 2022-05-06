import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [, setErrors] = useState();

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = {};
    for (const fieldName in data) {
      if (data[fieldName].trim() === '') {
        errors[fieldName] = `${fieldName} - is required`;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary btn-sm m-3">
        Отправить данные
      </button>
    </form>
  );
};

export default Login;
