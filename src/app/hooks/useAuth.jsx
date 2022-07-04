import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import axios from 'axios';
import localStorageService from '../services/localStorage.service';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });

      console.log(data);
      localStorageService.setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким email уже существует'
          };

          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });

      console.log(data);
      localStorageService.setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorObject = {};
        if (message === 'EMAIL_NOT_FOUND') {
          errorObject.email = 'Пользователь с таким email не зарегистрирован';
        } else {
          errorObject.password = 'Неправильно введен пароль';
        }
        throw errorObject;
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;