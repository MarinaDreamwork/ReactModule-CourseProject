import { useEffect, useState } from 'react';
import { paginate } from '../utils/paginate';
import api from '../api';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import User from './user';
import PropTypes from 'prop-types';
import GroupList from './groupList';

const Users = ({ users, onDelete, onToggleBookMark }) => {
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const handleChangeClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const clearFilter = () => setSelectedProf();
  const filteredUsers = selectedProf
    ? users.filter((user) => {
      return user.profession === selectedProf;
    })
    : users;
  const count = filteredUsers.length;
  const partOfUsers = paginate(filteredUsers, pageSize, currentPage);

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data));
  }, []);

  return (
    <div className='d-flex'>
      {professions && (
        <div className='d-flex flex-column flex-shrink-0 p-3 pt-4'>
          <GroupList items={professions} onItemSelect={handleProfessionSelect} currentItem={selectedProf}/>
          <button className='btn btn-secondary mt-2' onClick={clearFilter}>Очистить</button>
        </div>)}
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-center'>
          <SearchStatus length={count} />
        </div>
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
        <div className='d-flex justify-content-center'>
          <Pagination
            usersCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangeClick={handleChangeClick}/>
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default Users;
