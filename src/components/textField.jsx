import PropTypes from 'prop-types';
import { useState } from 'react';

const TextField = ({ label, type, value, onChange, name, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <input
          className={getInputClasses()}
          id={name}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          name={name}
        />
        {type === 'password' && (<button className='btn btn-outline-secondary' onClick={toggleShowPassword}><i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i></button>)}
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string
};

export default TextField;
