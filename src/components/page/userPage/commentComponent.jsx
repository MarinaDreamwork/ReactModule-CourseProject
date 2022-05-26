import PropTypes from 'prop-types';
// import { useState } from 'react';
// import API from '../../../api';
import { getDate } from '../../../utils/getDate';

const CommentComponent = ({ comments, onDeleteClick }) => {
  console.log('comments', comments);
  const getName = (id) => {
    const nameObj = JSON.parse(localStorage.getItem('users')).filter(user => (id === user._id));
    return nameObj[0].name;
  };
  return (
    <>
      {
        comments.map((comment, index) => <div key={index} className='bg-light card-body mb-3'>
          <div className='row'>
            <div className='col'>
              <div className='d-flex flex-start '>
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                  .toString(36)
                  .substring(7)}.svg`}
                  className='rounded-circle shadow-1-strong me-3'
                  alt='avatar'
                  width='65'
                  height='65'
                />
                <div className='flex-grow-1 flex-shrink-1'>
                  <div className='mb-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className='mb-1 '>
                        {getName(comment.userId)} -
                        <span className='small'>
                          {' ' + getDate(comment.created_at)}
                        </span>
                      </p>
                      <button className='btn btn-sm text-primary d-flex align-items-center' onClick={() => onDeleteClick(comment._id)}>
                        <i className='bi bi-x-lg'></i>
                      </button>
                    </div>
                    <p className='small mb-0'>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
    </>
  );
};

CommentComponent.propTypes = {
  comments: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func
};

export default CommentComponent;
