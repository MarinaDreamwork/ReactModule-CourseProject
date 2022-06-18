import PropTypes from 'prop-types';

const ChooseField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const optionArray =
    !Array.isArray(options) && typeof (options) === 'object'
      ? Object.values(options)
      : options;

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className={getInputClasses()}
        id={name}
        value={value}
        onChange={handleChange}
        name={name}>
        <option disabled value="">{defaultOption}</option>
        {
          optionArray.length > 0 &&
          optionArray.map(option => <option
            key={option.value}
            value={option.value}>
            {option.label}
          </option>)
        }
      </select>
      {
        error && <div className="invalid-feedback">
          {error}
        </div>
      }
    </div>
  );
};

ChooseField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  name: PropTypes.string
};

export default ChooseField;
