import { useState } from 'react';
import api from './api';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const quantityOfUsers = users.length;

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
    <div>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={onToggleBookMark}
        quantityOfUsers={quantityOfUsers} />
    </div>
  );
};

export default App;
