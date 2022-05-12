import PropTypes from 'prop-types';

const Qualities = ({ color, name }) => {
  return (
    <span className={'m-2 badge bg-' + color}>{name}</span>
  );
};

Qualities.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualities;
