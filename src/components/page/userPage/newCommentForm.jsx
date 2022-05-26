// import { useEffect } from 'react';
// import API from '../../../api';
import PropTypes from 'prop-types';

const NewCommentForm = ({ onHandleChange, onHandleSubmit, senders, isValid, data }) => {
  return (
    <>
    <form onSubmit={onHandleSubmit}>
      <select value={data.userId} className="form-select" aria-label="Default select example" name='userId' onChange={onHandleChange}>
        <option defaultValue='Выберете пользователя'>Выберете пользователя</option>
        {
          senders.map(sender => <option
            key={sender._id}
            value={sender._id}
            name='userId'
            >
              {sender.name}
            </option>
          )
        }
      </select>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Сообщение</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='content' onChange={onHandleChange} value={data.content}></textarea>
      </div>
      <input className='btn btn-primary d-flex justify-content-end' type='submit' value='Опубликовать' disabled={!isValid}/>
      </form>
    </>
  );
};

NewCommentForm.propTypes = {
  onHandleChange: PropTypes.func,
  onHandleSubmit: PropTypes.func,
  senders: PropTypes.array,
  setSenders: PropTypes.func,
  isValid: PropTypes.bool,
  data: PropTypes.object
};

export default NewCommentForm;
