import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationLinks from './components/ui/navigationLinks';
import Users from './layout/users';
import Login from './layout/login';
import Main from './layout/main';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layout/logout';
import AppLoader from './components/HOC/appLoader';

const App = () => {
  return (
    <div>
      <AppLoader>
        <NavigationLinks />
           <Switch>
            <ProtectedRoute
              path='/users/:userId?/:edit?'
              component={Users}
            />
            <Route path='/logout' component={LogOut} />
            <Route path='/login/:type?' component={Login} />
            <Route path='/' exact component={Main} />
            <Redirect to='/' />
          </Switch>
        </AppLoader>
      <ToastContainer />
    </div>
  );
};

export default App;
