import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const handleToggleMenu = () => {
    setOpen(prevState => !prevState);
  };
  const { currentUser } = useAuth();
  return (
    <div className="dropdown" onClick={handleToggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center" >
        <div className="me-2">{currentUser.name}</div>
        <img src={currentUser.image}
              alt="avatar"
              className='img-responsive rounded-circle'
              height='40'
          />
          </div>
        <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
          <Link
            to={`/users/${currentUser._id}`} className='dropdown-item'>
              Profile
          </Link>
          <Link
            to='/logout'
            className='dropdown-item'>
            Logout
          </Link>
        </div>
      </div>
  );
};

export default NavProfile;
