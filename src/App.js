import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationLinks from './components/ui/navigationLinks';
import Users from './layout/users';
import Login from './layout/login';
import Main from './layout/main';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
import { AuthProvider } from './hooks/useAuth';
import { UserProvider } from './hooks/useUser';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layout/logout';
import { QualityProvider } from './hooks/useQuality';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavigationLinks />
        <QualityProvider>
          <ProfessionProvider>
            <UserProvider>
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
          </UserProvider>
          </ProfessionProvider>
          </QualityProvider>
        </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
