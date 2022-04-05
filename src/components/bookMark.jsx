import PropTypes from 'prop-types';

const BookMark = ({ onToggleBookMark, user }) => {
  const getClassFromStatus = () => {
    return 'bi bi-bookmark' + (user.bookmark ? '-fill' : '');
  };

  return (
    <i className={getClassFromStatus()} onClick={() => onToggleBookMark(user._id)}></i>
  );
};

BookMark.propTypes = {
  onToggleBookMark: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default BookMark;
