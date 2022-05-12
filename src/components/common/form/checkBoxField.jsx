import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '');
  };

  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div className='mb-4'>
      <div className="form-check">
        <input
          className={getInputClasses()}
          type="checkbox"
          value=""
          id={name}
          checked={value}
          onChange={handleChange}/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {children}
        </label>
        {error && <div id="validationServer03Feedback" className="invalid-feedback">
          {error}
        </div>}
      </div>
    </div>);
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  error: PropTypes.string
};

export default CheckBoxField;
