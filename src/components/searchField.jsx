import PropTypes from 'prop-types';

const SearchField = ({ users, onSearchChange }) => {
  const handleSearchChange = ({ target }) => {
    if (target.value === '') return onSearchChange(null);
    users.filter(user => user.name.toLowerCase().includes(target.value.trim().toLowerCase()) ? onSearchChange(user) : '');
  };

  return (
    <div className="mb-3">
      <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchChange}/>
    </div>
  );
};

SearchField.propTypes = {
  users: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

export default SearchField;
