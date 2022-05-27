import PropTypes from 'prop-types';

const TextAreaField = ({ label, value, onChange, name, error }) => {
  console.log('name:', name);
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  const handleChange = ({ target }) => {
    console.log('target', target);
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <textarea
          className={getInputClasses()}
          id={name}
          rows="3"
          name={name}
          onChange={handleChange}
          value={value}>
        </textarea>
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};
TextAreaField.defaultProps = {
  type: 'text'
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaField;
