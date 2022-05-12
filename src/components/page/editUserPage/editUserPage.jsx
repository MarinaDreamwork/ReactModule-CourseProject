import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import API from '../../../api';
import ChooseField from '../../common/form/chooseField';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import TextField from '../../common/form/textField';
import { validator } from '../../../utils/validator';
import { useHistory } from 'react-router-dom';

const EditUserPage = ({ userId }) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);

  const history = useHistory();

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
    const { profession, qualities } = data;
    API.users.update(userId, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
    history.goBack();
    // console.log({
    //   ...data,
    //   profession: getProfessionById(profession),
    //   qualities: getQualities(qualities)
    // });
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Полное имя обязательно для заполнения'
      }
    },
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

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
    API.users.getById(userId).then((data) => {
      console.log('data', data);
      setData({
        name: data.name,
        email: data.email,
        profession: data.profession.name,
        sex: data.sex,
        qualities: data.qualities.map(quality => ({ label: quality.name, value: quality._id, color: quality.color }))
      });
    });
  }, []);

  return (
    <>
      { data
        ? (<div className='container mt-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 shadow p-4'>
              <form onSubmit={handleSubmit}>
                <TextField
                  label='Имя'
                  value={data.name}
                  onChange={handleChange}
                  name='name'
                  type='text'
                  error={errors.name}
                />
                <TextField
                  label='Электронная почта'
                  value={data.email}
                  onChange={handleChange}
                  name='email'
                  error={errors.email}
                />
                <ChooseField
                  label='Выберете Вашу профессию:'
                  name='profession'
                  options={professions}
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
                  options={qualities}
                  name='qualities'
                  label='Выберете Ваши качества:'
                  onChange={handleChange}
                  value={data.qualities}
                />
                <button
                  className='btn btn-primary w-100 mx-auto'
                  disabled={!isValid} >
                    Обновить
                </button>
              </form>
            </div>
          </div>
        </div>) : <p>Loading...</p>
      };
    </>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string
};

export default EditUserPage;
