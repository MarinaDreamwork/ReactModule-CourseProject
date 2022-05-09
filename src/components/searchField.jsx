import PropTypes from 'prop-types';

const SearchField = ({ onSearchChange, value }) => {
  const handleSearchChange = ({ target }) => {
    onSearchChange(target.value);
  };

  return (
    <div className="mb-3">
      <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchChange} value={value}/>
    </div>
  );
};

SearchField.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default SearchField;
