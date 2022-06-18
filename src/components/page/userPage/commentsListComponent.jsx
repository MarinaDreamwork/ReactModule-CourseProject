import CommentsComponent from './commentsComponent';
import NewCommentForm from './newCommentForm';
import _ from 'lodash';
import { useComment } from '../../../hooks/useComment';
import { useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const CommentsListComponent = () => {
  const { userId } = useParams();
  const { createComment, comments, removeComment } = useComment();
  console.log('comments', comments);

  const handleDeleteClick = (id) => {
    removeComment(id);
  //  console.log('comment id', id);
  //  API.comments.remove(id).then(id => setComments(comments.filter(comment => comment._id !== id)));
  };
  const handleSubmit = (data) => {
  //   API.comments.add(data).then(data => setComments([...comments, data]));
    createComment(data);
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
      {comments?.length > 0 && <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          <CommentsComponent
            comments={sortedComments}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
      }
  </>
  );
};

export default CommentsListComponent;
