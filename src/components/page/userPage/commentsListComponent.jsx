import { useState } from 'react';
import CommentComponent from './commentComponent';
import API from '../../../api';
import PropTypes from 'prop-types';
import NewCommentForm from './newCommentForm';
import _ from 'lodash';
// import { useParams } from 'react-router-dom';

const CommentsListComponent = ({ userId }) => {
  // const { userId } = useParams();
  console.log('userId', userId);
  const [comments, setComments] = useState([]);

  const handleDeleteClick = (id) => {
   console.log('comment id', id);
   API.comments.remove(id).then(id => setComments(comments.filter(comment => comment._id !== id)));
  };
  const handleSubmit = (data) => {
    API.comments.add(data).then(data => setComments([...comments, data]));
  };

  const sortedComments = _.orderBy(comments, ['created_by'], ['desc']);

  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <h2>New comment</h2>
          <NewCommentForm onHandleSubmit={handleSubmit} userId={userId}/>
        </div>
      </div>
      {comments.length > 0 && <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          <CommentComponent comments={sortedComments} onDeleteClick={handleDeleteClick}/>
        </div>
      </div>
      }
  </>
  );
};

CommentsListComponent.propTypes = {
  userId: PropTypes.string.isRequired
};

export default CommentsListComponent;
