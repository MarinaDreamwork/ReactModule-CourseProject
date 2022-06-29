import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../store/users';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { loadQualitiesList } from '../../store/qualities';
import { loadProfessionsList } from '../../store/profession';

const AppLoader = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
     if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (usersStatusLoading) return 'Loading...';
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default AppLoader;
