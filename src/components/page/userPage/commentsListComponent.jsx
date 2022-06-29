import CommentsComponent from './commentsComponent';
import NewCommentForm from './newCommentForm';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createComment, getComments, getCommentsLoading, loadCommentsList, removeComment } from '../../../store/comments';
import { getCurrentUserId } from '../../../store/users';

const CommentsListComponent = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoading());
  const comments = useSelector(getComments());
  const currentUserId = useSelector(getCurrentUserId());
  console.log('comments', comments);

  const handleDeleteClick = (id) => {
    dispatch(removeComment(id));
  //  API.comments.remove(id).then(id => setComments(comments.filter(comment => comment._id !== id)));
  };
  const handleSubmit = (data) => {
  //   API.comments.add(data).then(data => setComments([...comments, data]));
    dispatch(createComment(data, userId, currentUserId));
  };

  const sortedComments = _.orderBy(comments, ['created_by'], ['desc']);

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  return (
    <>
      <div className='card mb-2'>
        <div className='card-body '>
          <h2>New comment</h2>
           <NewCommentForm onHandleSubmit={handleSubmit} userId={userId}/>
        </div>
      </div>
      {comments?.length > 0 && <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          { !isLoading
            ? <CommentsComponent
                comments={sortedComments}
                onDeleteClick={handleDeleteClick}
              />
            : 'Comments loading...'
          }
        </div>
      </div>
      }
  </>
  );
};

export default CommentsListComponent;
