import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CommentsListComponent from './commentsListComponent';
import QualitiesCard from './qualitiesCard';
import MeetingsCard from './meetingsCard';
import UserCard from './userCard';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';

const UserPage = ({ userId }) => {
  const selectedUser = useSelector(getUserById(userId));
  const history = useHistory();

  const handleSettingsClick = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (selectedUser) {
    return (
      <div className='container'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <UserCard userId={userId} onSettingsClick={handleSettingsClick}/>
            <QualitiesCard qualities={selectedUser.qualities} />
            <MeetingsCard meetings={selectedUser.completedMeetings} />
          </div>
          <div className='col-md-8'>
            <CommentsListComponent />
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
