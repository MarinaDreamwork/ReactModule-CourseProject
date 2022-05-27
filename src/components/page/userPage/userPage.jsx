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
  const [selectedUser, setSelectedUser] = useState();
  // const { userId } = useParams();
  const history = useHistory();
  useEffect(() => {
    API.users.getById(userId).then(data => setSelectedUser(data));
  }, []);
  const handleSettingsClick = () => {
    history.push(`/users/${userId}/edit`);
  };
  console.log('select', selectedUser);

  if (selectedUser) {
    return (
      <div className='container'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <UserCard user={selectedUser} onSettingsClick={handleSettingsClick}/>
            <QualitiesCard qualities={selectedUser.qualities} />
            <MeetingsCard meetings={selectedUser.completedMeetings} />
          </div>
          <div className='col-md-8'>
            <CommentsListComponent userId={userId}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <p>Loading...</p>
    );
  };
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
