import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  return (
    <h1>Вы вышли из системы</h1>
  );
};

export default LogOut;
