import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import API from '../../../api';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CommentsListComponent from './commentsListComponent';
import QualitiesCard from './qualitiesCard';
import MeetingsCard from './meetingsCard';
import UserCard from './userCard';

const UserPage = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  // const { userId } = useParams();
  const history = useHistory();
  useEffect(() => {
    API.users.getById(userId).then(data => setSelectedUser([data]));
  }, []);

  const handleSettingsClick = () => {
    history.push(`/users/${userId}/edit`);
  };

  return (
    <>
      { selectedUser.length > 0
        ? selectedUser.map(user => (
            <div key={user._id} className='container'>
              <div className='row gutters-sm'>
                <div className='col-md-4 mb-3'>
                  <UserCard user={user} onSettingsClick={handleSettingsClick}/>
                  <QualitiesCard user={user} />
                  <MeetingsCard user={user} />
                </div>
                <div className='col-md-8'>
                  <CommentsListComponent userId={userId} />
                </div>
            </div>
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
