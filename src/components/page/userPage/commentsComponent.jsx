import PropTypes from 'prop-types';
// import { useUser } from '../../../hooks/useUser';
// import { useState } from 'react';
// import API from '../../../api';
import Comment from './comment';

const CommentsComponent = ({ comments, onDeleteClick }) => {
  console.log('comments', comments);
  // const getName = (id) => {
  //   const nameObj = JSON.parse(localStorage.getItem('users')).filter(user => (id === user._id));
  //   return nameObj[0].name;
  // };

  return comments.map((comment, index) => (
        <Comment key={index} {...comment} onDeleteClick={onDeleteClick} />
      ));
};

CommentsComponent.propTypes = {
  comments: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  userId: PropTypes.string
};

export default CommentsComponent;
