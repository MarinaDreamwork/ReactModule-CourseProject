import { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalLetter: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать минимум одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из восьми символов',
        value: 8
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <TextField
        label='Электронная почта'
        value={data.email}
        onChange={handleChange}
        name='email'
        error={errors.email}
      />
      <TextField
        label='Пароль'
        value={data.password}
        onChange={handleChange}
        name='password'
        type='password'
        error={errors.password}
      />
      <CheckBoxField
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'>
          Остаться в приложении
      </CheckBoxField>
      <button className='btn btn-primary w-100 mx-auto' disabled={!isValid}>Submit</button>
    </form>
  );
};

export default LoginForm;
