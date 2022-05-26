import { useEffect, useState } from 'react';
import CommentComponent from './commentComponent';
import API from '../../../api';
import PropTypes from 'prop-types';
import NewCommentForm from './newCommentForm';
import { validator } from '../../../utils/validator';

const CommentsListComponent = ({ userId }) => {
  const [data, setData] = useState({ pageId: userId, userId: '', content: '' });
  const [errors, setErrors] = useState({});
  const [comments, setComments] = useState([]);
  const [senders, setSenders] = useState([]);

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Необходимо выбрать отправителя сообщения'
      }
    },
    content: {
      isRequired: {
        message: 'Необходимо выбрать отправителя сообщения'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    console.log('target', target);
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
    console.log('data', data);
  };
  const handleDeleteClick = (id) => {
    console.log('comment id', id);
    API.comments.remove(id);
    // обновить данные comments из localStorage, по user
    API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    API.comments.add(data);
    // console.log(API.comments.add(newComment).then(data => setComments(data)));
    API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
    // setSelected('Выберете пользователя');
    setData({ pageId: userId, userId: '', content: '' });
  };

  useEffect(() => {
    API.users.fetchAll().then(data => setSenders(data));
    API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
    console.log('data', data);
  }, []);
   useEffect(() => {
    validate();
  }, [data]);
  const isValid = Object.keys(errors).length === 0;
  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <h2>New comment</h2>
          <NewCommentForm onHandleChange={handleChange} onHandleSubmit={handleSubmit} senders={senders} setSenders={setSenders} isValid={isValid} data={data}/>
        </div>
      </div>
      {comments.length > 0 ? <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          <CommentComponent comments={comments} onDeleteClick={handleDeleteClick}/>
        </div>
      </div> : null
      }
  </>
  );
};

CommentsListComponent.propTypes = {
  userId: PropTypes.string.isRequired
};

export default CommentsListComponent;
