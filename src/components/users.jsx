import { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const quantityOfUsers = users.length;

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(td => td._id !== userId));
  } 
  const renderPhrase = (number) => {
    let basePhrase = ' с тобой сегодня';
    let rightPhrase = '';
  
    if(number === 2 || number === 3 || number === 4) {
      rightPhrase = 'человека тусанут';
    } else if(number === 0) {
      rightPhrase = 'Никто не тусанёт';
    } else {
      rightPhrase = 'человек тусанёт';
    }
    return rightPhrase + basePhrase;
  }

  const getMessageClasses = () => {
    let classes = 'badge m-2 ';
    classes += quantityOfUsers === 0 ? 'bg-danger' : 'bg-primary';
    return classes;
  }

    return (
      <>
        <h2>
          <span className={getMessageClasses()}>
          {quantityOfUsers === 0 ? '' : quantityOfUsers} {renderPhrase(quantityOfUsers)}
          </span>
        </h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead> 
          <tbody>
            {
              users.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map((quality => <span key={quality._id} className={'m-2 badge bg-' + quality.color}>{quality.name}</span> ))}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate} /5</td>
                    <td><button className='btn btn-danger' onClick={() => handleDelete(user._id)}>delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    )
}


export default Users;