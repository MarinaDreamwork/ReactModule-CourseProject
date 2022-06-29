import { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import ChooseField from '../common/form/chooseField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQual } from '../../store/qualities';
import { getProfessions } from '../../store/profession';
import { signUp } from '../../store/users';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

 // const signUp = useSelector(si);

  const professions = useSelector(getProfessions());
  const professionList = professions.map(profession => ({
    value: profession._id,
    label: profession.name
  }));

  const qualities = useSelector(getQual());
  const qualitiesList = qualities.map(qual => ({
    value: qual._id,
    label: qual.name
 }));

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
    const newData = {
      ...data,
      qualities: data.qualities.map(q => q.value)
    };
      dispatch(signUp(newData));
      history.push('/');
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
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      },
      min: {
        message: 'Имя должно содержать не менее 3-х символов',
        value: 3
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
    },
    profession: {
      isRequired: {
        message: 'Выбор профессии обязателен'
      }
    },
    licence: {
      isRequired: {
        message: 'Для дальнейшего использования нашего ресурса, необходимо ознакомиться и согласиться с условиями пользовательского соглашения'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     if (prof.value === id) {
  //       return { _id: prof.value, name: prof.label };
  //     }
  //   }
  // };
  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color
  //         });
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <TextField
        label='Электронная почта'
        value={data.email}
        onChange={handleChange}
        name='email'
        error={errors.email}
      />
      <TextField
        label='Имя'
        value={data.name}
        onChange={handleChange}
        name='name'
        error={errors.name}
      />
      <TextField
        label='Пароль'
        value={data.password}
        onChange={handleChange}
        name='password'
        type='password'
        error={errors.password}
      />
      <ChooseField
        label='Выберете Вашу профессию:'
        name='profession'
        options={professionList}
        onChange={handleChange}
        defaultOption='Choose...'
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Выберете Ваш пол:'
      />
      <MultiSelectField
        defaultValue={data.qualities}
        options={qualitiesList}
        name='qualities'
        label='Выберете Ваши качества:'
        onChange={handleChange}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}>
          Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className='btn btn-primary w-100 mx-auto'
        disabled={!isValid}>
          Submit
      </button>
    </form>
  );
};

export default RegisterForm;
