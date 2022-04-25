import User from './user';
import PropTypes from 'prop-types';

const UserTable = ({ users, onSort, ...rest }) => {
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th onClick={() => onSort('name')}scope='col'>Имя</th>
          <th scope='col'>Качества</th>
          <th onClick={() => onSort('profession.name')} scope='col'>Профессия</th>
          <th onClick={() => onSort('completedMeetings')} scope='col'>Встретился, раз</th>
          <th onClick={() => onSort('rate')} scope='col'>Оценка</th>
          <th onClick={() => onSort('bookmark')} scope='col'>Избранное</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <User
              {...rest}
              user={user}
              key={user._id} />
          ))
        }
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UserTable;
