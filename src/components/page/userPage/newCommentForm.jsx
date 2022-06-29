import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';
import TextAreaField from '../../common/form/textAreaField';

const NewCommentForm = ({ onHandleSubmit, userId }) => {
  const initialState = { pageId: userId, userId: '', content: '' };
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

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
    console.log('data', data);
    onHandleSubmit(data);

    // обнуление
    setData(initialState);
    setErrors({});
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Поле сообщение должно быть заполнено'
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
    // API.users.fetchAll().then(setSenders);
    // API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextAreaField
            label='Сообщение'
            name='content'
            value={data.content || ''}
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
