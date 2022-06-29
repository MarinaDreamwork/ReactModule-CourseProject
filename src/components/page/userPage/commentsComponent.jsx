import PropTypes from 'prop-types';
import Comment from './comment';

const CommentsComponent = ({ comments, onDeleteClick }) => {
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
