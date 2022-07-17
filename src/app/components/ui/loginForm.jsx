import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import TextField from '../common/form/textField';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/users';

const LoginForm = () => {
  const history = useHistory();

  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Электронная почта введена некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      }
    }
  };

  const dispatch = useDispatch();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/';
    dispatch(signIn({ payload: data, redirect }));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="Stay on">
        {' '}
        Оставаться в системе{' '}
      </CheckBoxField>
      <button
        type="submit"
        className="btn btn-primary w-100 mx-auto"
        disabled={!isValid}
      >
        Отправить данные
      </button>
    </form>
  );
};

export default LoginForm;
