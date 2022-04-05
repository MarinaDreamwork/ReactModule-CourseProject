import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
  const getMessageClasses = () => {
    let classes = 'badge m-2 ';
    classes += length === 0 ? 'bg-danger' : 'bg-primary';
    return classes;
  };
  const renderPhrase = (number) => {
    const basePhrase = ' с тобой сегодня';
    let rightPhrase = '';

    if (number === 2 || number === 3 || number === 4) {
      rightPhrase = 'человека тусанут';
    } else if (number === 0) {
      rightPhrase = 'Никто не тусанёт';
    } else {
      rightPhrase = 'человек тусанёт';
    }
    return rightPhrase + basePhrase;
  };

  return (
    <h2>
      <span className={getMessageClasses()}>
        {length === 0 ? '' : length} {renderPhrase(length)}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number
};

export default SearchStatus;
