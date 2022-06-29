import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import UsersLoader from '../components/HOC/usersLoader';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import { getCurrentUserId } from '../store/users';

const Users = () => {
    const params = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const { userId, edit } = params;
    console.log('currentUserId', currentUserId);
    console.log('userId', userId);

    return (
      <>
        <UsersLoader>
          { userId ? (
            edit ? (
              (userId === currentUserId)
              ? <EditUserPage userId={userId} />
              : <Redirect to={`/users/${currentUserId}/edit`} />)
              : (
              <UserPage userId={userId} />
            )
            ) : (
              <UsersListPage />
            )
          }
          </UsersLoader>
      </>
    );
};

export default Users;
