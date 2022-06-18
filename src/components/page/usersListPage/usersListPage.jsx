import { useEffect, useState } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import SearchStatus from '../../ui/searchStatus';
import GroupList from '../../common/groupList';
import UserTable from '../../ui/userTable';
import _ from 'lodash';
import SearchField from '../../searchField';
import { useUser } from '../../../hooks/useUser';
import { useQuality } from '../../../hooks/useQuality';
import { useProfession } from '../../../hooks/useProfession';
import { useAuth } from '../../../hooks/useAuth';

const UsersListPage = () => {
  const { users } = useUser();
  const { qualities } = useQuality();
  const { currentUser } = useAuth();
  console.log('qual', qualities);
  const [currentPage, setCurrentPage] = useState(1);
  const { professionLoading, professions } = useProfession();
  console.log('prof', professionLoading);
  const [selectedProf, setSelectedProf] = useState();
  // const [users, setUsers] = useState();
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
    setCurrentPage(1);
  }, [selectedProf, searchFieldData]);

  // useEffect(() => {
  //   api.users.fetchAll().then(data => setUsers(data));
  // }, []);

  const clearFilter = () => setSelectedProf();
  const redExpSearchData = new RegExp(`(?:${searchFieldData})`, 'gi');
  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchFieldData
      ? data.filter(user => user.name.match(redExpSearchData))
      : selectedProf
        ? data.filter((user) => {
          return JSON.stringify(user.profession) === JSON.stringify(selectedProf);
        })
        : data;
        return filteredUsers.filter(user => user._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const count = filteredUsers.length;
    const partOfUsers = paginate(sortedUsers, pageSize, currentPage);

    const handleDelete = (userId) => {
      console.log(userId);
      // setUsers(prevState => prevState.filter(td => td._id !== userId));
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
      // setUsers(bookmarkedUsers);
      console.log(bookmarkedUsers);
    };

    return (
      <div className='d-flex'>
        {(professions && !professionLoading) && (
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

export default UsersListPage;
