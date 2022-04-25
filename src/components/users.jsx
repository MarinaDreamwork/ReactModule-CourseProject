import { useEffect, useState } from 'react';
import { paginate } from '../utils/paginate';
import api from '../api';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import UserTable from './userTable';

const Users = ({ users, ...rest }) => {
  const pageSize = 2;

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
      return JSON.stringify(user.profession) === JSON.stringify(selectedProf);
    })
    : users;
  const count = filteredUsers.length;
  const partOfUsers = paginate(filteredUsers, pageSize, currentPage);

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

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
        <UserTable users={partOfUsers} {...rest} />
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
