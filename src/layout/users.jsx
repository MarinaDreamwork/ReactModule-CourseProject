import { useHistory, useParams, Switch, Route } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage/usersListPage';

const Users = () => {
  const params = useParams();
  const { location } = useHistory();
  const isPathname = (location.pathname).includes('edit');
  const { userId } = params;
  return (
    <>
      {userId
        ? (isPathname ? (
            <Switch>
              <Route
                path='/users/:userId?/edit'
                render={(...props) => <EditUserPage
                                        {...props}
                                        userId={userId}
                                      />}
              />
            </Switch>) : <UserPage userId={userId} />)
        : <UsersListPage />}
    </>
  );
};

export default Users;
