const Qualities = ({color, name}) => {
  return(
    <span className={'m-2 badge bg-' + color}>{name}</span>
  )
} 

export default Qualities;