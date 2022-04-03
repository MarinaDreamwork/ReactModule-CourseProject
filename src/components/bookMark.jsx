const BookMark = ({...rest}) => {
  const {id, onToggleBookMark} = rest;

  const getClassFromStatus = () => {
    return 'bi bi-bookmark' + (rest.user.bookmark ? '-fill': '');
  }

  return (
    <i className={getClassFromStatus()} onClick={() => onToggleBookMark(id)}></i>
  )
}

export default BookMark;