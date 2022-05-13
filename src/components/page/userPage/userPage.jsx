import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import API from '../../../api';
import PropTypes from 'prop-types';

const UserPage = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    API.users.getById(userId).then(data => setSelectedUser([data]));
  }, []);
  console.log('selectedUser', selectedUser);

  return (
    <>
      { selectedUser.length > 0
        ? selectedUser.map(user => (
          <div key={user._id}>
            <h2>{user.name}</h2>
            <h3>Профессия: {user.profession.name}</h3>
            {
              user.qualities.map(quality => <p key={quality._id} className={'m-2 badge bg-' + quality.color}>{quality.name}</p>)
            }
            <p>completedMeetings: {user.completedMeetings}</p>
            <h3>Rate: {user.rate}</h3>
            <NavLink
              to={`/users/${userId}/edit`}
              className='btn btn-dark'>
                Изменить
            </NavLink>
          </div>
        ))
        : <p>Loading...</p>
      }
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
