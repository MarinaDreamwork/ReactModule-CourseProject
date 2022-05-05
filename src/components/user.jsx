import { useHistory, useParams } from 'react-router-dom';
import api from '../api';
import { useEffect, useState } from 'react';

const User = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const history = useHistory();
  const params = useParams();
  const { userId } = params;

  const handleReturnAllUsers = () => {
    history.push('/users');
  };

  useEffect(() => {
    api.users.getById(userId).then(data => setSelectedUser([data]));
  }, [selectedUser]);

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
            <button className='btn btn-dark' onClick={handleReturnAllUsers}>Все пользователи</button>
          </div>))
        : <p>Loading...</p>
      }
    </>
  );
};

export default User;
