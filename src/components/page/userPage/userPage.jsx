import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CommentsListComponent from './commentsListComponent';
import QualitiesCard from './qualitiesCard';
import MeetingsCard from './meetingsCard';
import UserCard from './userCard';
import { useUser } from '../../../hooks/useUser';
import { CommentProvider } from '../../../hooks/useComment';

const UserPage = ({ userId }) => {
  // const [selectedUser, setSelectedUser] = useState({});
  const { getUserById } = useUser();
  const selectedUser = getUserById(userId);
  // const { userId } = useParams();
  const history = useHistory();
  const handleSettingsClick = () => {
    history.push(`/users/${userId}/edit`);
  };
  console.log('select', selectedUser);

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
            <CommentProvider>
              <CommentsListComponent />
            </CommentProvider>
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
