import { useState, useEffect } from 'react';
import API from '../../../api';
import PropTypes from 'prop-types';
import ChooseField from '../../common/form/chooseField';
import { validator } from '../../../utils/validator';
import TextAreaField from '../../common/form/textAreaField';

const NewCommentForm = ({ onHandleSubmit, userId }) => {
  const initialState = { pageId: userId, userId: '', content: '' };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [senders, setSenders] = useState([]);

  const handleChange = (target) => {
    console.log('target', target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onHandleSubmit(data);
    // обнуление
    setData(initialState);
    setErrors({});
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Необходимо выбрать отправителя сообщения'
      }
    },
    content: {
      isRequired: {
        message: 'Необходимо выбрать отправителя сообщения'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

    useEffect(() => {
    API.users.fetchAll().then(setSenders);
    // API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
  }, []);

  const arrayOfSenders = senders &&
    Object.keys(senders).map((userId) => ({
      label: senders[userId].name,
      value: senders[userId]._id
    }));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ChooseField
          value={data.userId}
          onChange={handleChange}
          options={arrayOfSenders}
          defaultOption='Выберете пользователя'
          name='userId'
          error={errors.userId}/>
        <div className="mb-3">
          <TextAreaField
            label='Сообщение'
            name='content'
            value={data.content}
            onChange={handleChange}
            error={errors.content}
          />
        </div>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary'>
            Опубликовать
          </button>
        </div>
      </form>
    </>
  );
};

NewCommentForm.propTypes = {
  onHandleSubmit: PropTypes.func,
  arrayOfSenders: PropTypes.array,
  userId: PropTypes.string
};

export default NewCommentForm;
