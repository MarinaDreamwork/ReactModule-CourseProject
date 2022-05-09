import PropTypes from 'prop-types';
import Bookmark from './bookMark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, searchFieldData }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: (user) => <QualitiesList qualities={user.qualities} /> },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное', component: (user) => (<Bookmark onToggleBookMark={onToggleBookMark} user={user}/>) },
    delete: { component: (user) => <button className='btn btn-danger' onClick={() => onDelete(user._id)}>delete</button> }
  };

  return (
    <>
      <Table columns={columns} onSort={onSort} selectedSort={selectedSort} data={users} searchFieldData={searchFieldData}/>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchFieldData: PropTypes.string
};

export default UserTable;
