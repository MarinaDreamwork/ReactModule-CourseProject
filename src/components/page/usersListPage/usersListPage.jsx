import { useEffect, useState } from 'react';
import { paginate } from '../../../utils/paginate';
import api from '../../../api';
import Pagination from '../../common/pagination';
import SearchStatus from '../../ui/searchStatus';
import GroupList from '../../common/groupList';
import UserTable from '../../ui/userTable';
import _ from 'lodash';
import SearchField from '../../searchField';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [users, setUsers] = useState();
  const [searchFieldData, setSearchFieldData] = useState('');
  const pageSize = 6;

  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', caret: 'bi bi-caret-up-fill', currentTH: 'name' });

  const handleChangeClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    if (searchFieldData !== '') setSearchFieldData('');
    setSelectedProf(item);
  };

  const handleSearchChange = (value) => {
    setSearchFieldData(value);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchFieldData]);

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  const clearFilter = () => setSelectedProf();
  const redExpSearchData = new RegExp(`(?:${searchFieldData})`, 'gi');
  if (users) {
    const filteredUsers = searchFieldData
      ? users.filter(user => user.name.match(redExpSearchData))
      : selectedProf
        ? users.filter((user) => {
          return JSON.stringify(user.profession) === JSON.stringify(selectedProf);
        })
        : users;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const count = filteredUsers.length;
    const partOfUsers = paginate(sortedUsers, pageSize, currentPage);

    const handleDelete = (userId) => {
      setUsers(prevState => prevState.filter(td => td._id !== userId));
    };

    const onToggleBookMark = (id) => {
      const bookmarkedUsers = users.map(user => {
        if (user._id === id) {
          if (!user.bookmark) {
            return { ...user, bookmark: true };
          } else {
            return { ...user, bookmark: false };
          };
        };
        return { ...user };
      });
      setUsers(bookmarkedUsers);
    };

    return (
      <div className='d-flex'>
        {professions && (
          <div className='d-flex flex-column flex-shrink-0 p-3 pt-4'>
            <GroupList items={professions} onItemSelect={handleProfessionSelect} currentItem={selectedProf} onSearchChange={handleSearchChange}/>
            <button className='btn btn-secondary mt-2' onClick={clearFilter}>Очистить</button>
          </div>)}
        <div className='d-flex flex-column'>
          <SearchStatus length={count} />
          <SearchField value={searchFieldData} onSearchChange={handleSearchChange} />
          <UserTable users={partOfUsers}
            onSort={handleSort}
            selectedSort={sortBy}
            onDelete={handleDelete}
            onToggleBookMark={onToggleBookMark}
            searchFieldData={searchFieldData}/>
          <Pagination
            usersCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangeClick={handleChangeClick}/>
        </div>
      </div>
    );
  }
  return <p>Loading...</p>;
};

export default Users;
