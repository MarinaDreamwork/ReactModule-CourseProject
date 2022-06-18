import { useEffect, useState } from 'react';
import ChooseField from '../../common/form/chooseField';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import TextField from '../../common/form/textField';
import { validator } from '../../../utils/validator';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useQuality } from '../../../hooks/useQuality';
import { useProfession } from '../../../hooks/useProfession';
import { useUser } from '../../../hooks/useUser';
import { useAuth } from '../../../hooks/useAuth';
import { changeProfessionFormat, changeQualityFormat } from '../../../utils/changeFormat';

const EditUserPage = ({ userId }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  });
  const { professions, getProfessionById } = useProfession();
  const { qualities, getQualitiesById } = useQuality();
  const professionList = changeProfessionsFormat(professions);
  const qualitiesList = changeQualitiesFormat(qualities);
  const { updateUserData } = useAuth();
  const { getUserById } = useUser();
  const user = getUserById(userId);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const backPreviousPage = () => {
    return history.goBack();
  };

  function changeProfessionsFormat(profArray) {
    return profArray.map(profItem => (
      {
        value: profItem._id,
        label: profItem.name
      }
    ));
  };

  function changeQualitiesFormat(qualArray) {
    return qualArray.map(qualItem => (
      {
        value: qualItem._id,
        label: qualItem.name,
        color: qualArray.color
      }
    ));
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid);
    const { profession, qualities } = data;
    updateUserData({
      ...data,
      _id: userId,
      profession: changeProfessionFormat(profession),
      qualities: changeQualityFormat(qualities)
    });
    backPreviousPage();
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
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const getProfession = (id) => {
    const profession = getProfessionById(id);
    return [{
      value: profession._id,
      label: profession.name
    }];
   };

  const getQualities = (arrayOfIds) => {
    const qualitiesArray = [];
    for (const elem of arrayOfIds) {
      console.log('elem', elem);
      const q = getQualitiesById(elem);
      console.log('q', q);
      qualitiesArray.push({
        value: q._id,
        label: q.name,
        color: q.color
      });
    }
    return qualitiesArray;
  };

  useEffect(() => {
    setData(prevState => ({
      ...prevState,
      name: user.name,
      email: user.email,
      profession: getProfession(user.profession),
      sex: user.sex,
      qualities: getQualities(user.qualities)
    }));
  }, []);

  return (
    <>
      <div className='container'>
        <button className='btn btn-primary' onClick={backPreviousPage}><i className="bi bi-caret-left"></i>Назад</button>
      </div>
      {
        data.profession && data.qualities
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
      }
    </>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string
};

export default EditUserPage;
