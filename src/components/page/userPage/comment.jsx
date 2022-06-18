import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';
import { useUser } from '../../../hooks/useUser';
// import { useState } from 'react';
// import API from '../../../api';
import { getDate } from '../../../utils/getDate';

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onDeleteClick
}) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);

  const { currentUser } = useAuth();

  // const getName = (id) => {
  //   const nameObj = JSON.parse(localStorage.getItem('users')).filter(user => (id === user._id));
  //   return nameObj[0].name;
  // };

  return (
    <div className='bg-light card-body mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start '>
            <img
              src={user.image}
              className='rounded-circle shadow-1-strong me-3'
              alt='avatar'
              width='65'
              height='65'
            />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1 '>
                      {user.name} -
                    <span className='small'>
                      {' ' + getDate(created)}
                    </span>
                  </p>
                  { currentUser._id === userId && (
                    <button className='btn btn-sm text-primary d-flex align-items-center' onClick={() => onDeleteClick(id)}>
                      <i className='bi bi-x-lg'></i>
                    </button>)
                  }
                </div>
                <p className='small mb-0'>
                  {content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  created_at: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func
};

export default Comment;
