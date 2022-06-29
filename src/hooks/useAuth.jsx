import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { localStorageService } from '../services/localStorage.service';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', { email, password, returnSecureToken: true });
      localStorageService.setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        completedMeetings: randomInt(0, 200),
        rate: randomInt(1, 5),
        image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                  .toString(36)
                  .substring(7)}.svg`,
        ...rest
      });
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
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', { email, password, returnSecureToken: true });
      console.log('data', data);
      localStorageService.setTokens(data);
      // console.log('email/pass', getUserByEmailPassword(email, password));
      await getUserData();
      history.push('/');
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      const errorEmailObject = { email: 'EMAIL не существует в системе' };
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

  // async function getUserByEmailPassword(email, password) {
  //   const { content } = await httpService.get();
  //   console.log('content', content);
  //   return content.find(user => user.email === email && user.password === password);
  // };

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      return content;
    } catch (error) {
      errorCatcher(error);
    };
  };

   async function updateUserData(updatedData) {
    try {
      const { content } = await userService.updateCurrentUser(updatedData);
      setCurrentUser(content);
      // await getUserData();
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  const errorCatcher = (error) => {
    setError(error);
  };

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push('/');
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser, logOut, updateUserData, isLoading }}>
      { children }
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
