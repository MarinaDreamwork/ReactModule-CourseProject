import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { localStorageService } from '../services/localStorage.service';

const httpAuth = axios.create();

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState();

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      console.log('post', data);
      localStorageService.setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      const errorObject = { email: 'Пользователь с таким EMAIL уже существует' };
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          throw errorObject;
        }
      }
    }
  };

  async function logIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      localStorageService.setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      const errorEmailObject = { email: 'EMAIL неверный' };
      const errorPasswordObject = { password: 'Пароль неверный' };
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          throw errorEmailObject;
        }
        if (message === 'INVALID_PASSWORD') {
          throw errorPasswordObject;
        }
      }
    }
  };

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    };
  };

  const errorCatcher = (error) => {
    setError(error);
  };

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
     { children }
  </AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
