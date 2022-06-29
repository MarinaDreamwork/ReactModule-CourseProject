import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/users';
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
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());

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
                  { user._id === currentUserId && (
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
