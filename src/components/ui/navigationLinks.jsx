import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './NavProfile';

const NavigationLinks = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="navbar">
      <ul className='nav'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>Main</Link>
        </li>
        { currentUser &&
          <li className='nav-item'>
            <Link className='nav-link' to='/users'>Users</Link>
          </li>
        }
      </ul>
      <div className="d-flex">
        { currentUser ? (
          <NavProfile />
        ) : (
           <Link className='nav-link' to='/login'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationLinks;
