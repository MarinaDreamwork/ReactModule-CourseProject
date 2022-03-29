import BookMark from "./bookMark";
import Qualities from "./qualitie";

const User = ({user, onDelete, onToggleBookMark}) => {

  const handleDelete = (id) => {
    onDelete(id);
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.qualities.map((quality => <Qualities key={quality._id} color={quality.color} name={quality.name} /> ))}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>
      <td><BookMark onToggleBookMark={onToggleBookMark} user={user}/></td>
      <td><button className='btn btn-danger' onClick={() => handleDelete(user._id)}>delete</button></td>
    </tr>
  )
}

export default User;