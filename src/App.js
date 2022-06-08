import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationLinks from './components/ui/navigationLinks';
import Users from './layout/users';
import Login from './layout/login';
import Main from './layout/main';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavigationLinks />
          <ProfessionProvider>
          <Switch>
            <Route path='/users/:userId?/:edit?'component={Users}/>
            <Route path='/login/:type?' component={Login} />
            <Route path='/' exact component={Main} />
            <Redirect to='/' />
          </Switch>
          </ProfessionProvider>
        </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
