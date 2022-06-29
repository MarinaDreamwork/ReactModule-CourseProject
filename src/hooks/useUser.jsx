import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';

export const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function getUserById(userId) {
    return users.find(u => u._id === userId);
  };

  async function checkUserByEmailPassword({ email, password }) {
    console.log('email:', email, 'password:', password);
     try {
      const { content } = await userService.get();
      const isExistUser = content.filter(user => user.email === email && user.password === password);
      console.log('isExist', isExistUser);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  console.log('users', users);

  return (
    <UserContext.Provider value={{ users, getUserById, checkUserByEmailPassword, getUsers }}>
      {!isLoading ? children : <h1>is loading...</h1>}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
