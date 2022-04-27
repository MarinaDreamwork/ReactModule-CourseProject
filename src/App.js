import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationLinks from './components/navigationLinks';
import User from './components/user';
import Users from './components/users';
import Login from './layout/login';
import Main from './layout/main';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationLinks />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId' render={(props) => <User {...props} />} />
        <Route path='/users' component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
