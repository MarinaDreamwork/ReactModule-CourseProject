import { useState } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import User from './user';
import PropTypes from 'prop-types';

const Users = ({ users, onDelete, onToggleBookMark, quantityOfUsers }) => {
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const partOfUsers = paginate(users, pageSize, currentPage);

  return (
    <>
      {
        <SearchStatus length={quantityOfUsers} />
      }
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'>Избранное</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
            partOfUsers.map(user => (
              <User
                key={user._id}
                user={user}
                onDelete={onDelete}
                onToggleBookMark={onToggleBookMark} />
            ))
          }
        </tbody>
      </table>
      <Pagination
        usersCount={quantityOfUsers}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangeClick={handleChangeClick}/>
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  quantityOfUsers: PropTypes.number.isRequired
};

export default Users;
