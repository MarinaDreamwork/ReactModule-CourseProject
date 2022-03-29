import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({users, onDelete, onToggleBookMark}) => {
  console.log('users', users);

  const quantityOfUsers = users.length;

    return (
      <>
        {
          <SearchStatus length={quantityOfUsers} />
        }
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead> 
          <tbody>
            {
              users.map(user => <User key={user._id} user={user} onDelete={onDelete} onToggleBookMark={onToggleBookMark} />)
            }
          </tbody>
        </table>
      </>
    )
}


export default Users;