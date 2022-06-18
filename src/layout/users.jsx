import { Redirect, useParams } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import { useAuth } from '../hooks/useAuth';
import { QualityProvider } from '../hooks/useQuality';
import { UserProvider } from '../hooks/useUser';

const Users = () => {
    const params = useParams();
    const { currentUser } = useAuth();
    console.log(currentUser);
    const { userId, edit } = params;
    return (
      <>
        <UserProvider>
          <QualityProvider>
          { userId ? (
            edit ? (
              (userId === currentUser._id)
              ? <EditUserPage userId={userId} />
              : (<Redirect to={`/users/${currentUser._id}/edit`}>
                  <EditUserPage userId={currentUser._id} />
                </Redirect>)
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
