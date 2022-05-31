import { useParams } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import { QualityProvider } from '../hooks/useQuality';
import { UserProvider } from '../hooks/useUser';
// import UserProvider from '../hooks/useUsers';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
      <>
        <UserProvider>
          <QualityProvider>
          {userId ? (
            edit ? (
              <EditUserPage />
            ) : (
              <UserPage userId={userId} />
            )
            ) : (
              <UsersListPage />
            )
          }
          </QualityProvider>
        </UserProvider>
      </>
    );
};

export default Users;
