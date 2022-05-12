import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationLinks from './components/ui/navigationLinks';
import Users from './layout/users';
import Login from './layout/login';
import Main from './layout/main';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationLinks />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/users/:userId?' component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
