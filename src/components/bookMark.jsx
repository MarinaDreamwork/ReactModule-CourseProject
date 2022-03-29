const BookMark = ({...rest}) => {
  console.log('rest', rest);
  const getClassFromStatus = () => {
    return 'bi bi-bookmark' + (rest.user.bookmark ? '-fill': '');
  }
  const handleToggleBookMark = (id) => {
    rest.onToggleBookMark(id);
  }
  return (
    <i className={getClassFromStatus()} onClick={() => handleToggleBookMark(rest.user._id)}></i>
  )
}

export default BookMark;