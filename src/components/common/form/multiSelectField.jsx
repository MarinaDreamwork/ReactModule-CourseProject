import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionArray =
    !Array.isArray(options) && typeof (options) === 'object'
      ? Object.values(options)
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <div className='mb-4'>
      <label className="form-label">{label}</label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        defaultValue={defaultValue}
        options={optionArray}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string
};

export default MultiSelectField;
