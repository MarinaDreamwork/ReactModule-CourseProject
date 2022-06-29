import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/users';
import NavProfile from './NavProfile';

const NavigationLinks = () => {
  const isLooggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar">
      <ul className='nav'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>Main</Link>
        </li>
        { isLooggedIn &&
          <li className='nav-item'>
            <Link className='nav-link' to='/users'>Users</Link>
          </li>
        }
      </ul>
      <div className="d-flex">
        { isLooggedIn ? (
          <NavProfile />
        ) : (
           <Link className='nav-link' to='/login'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationLinks;
