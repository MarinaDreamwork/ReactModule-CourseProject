import PropTypes from 'prop-types';

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, currentItem }) => {
  if (!Array.isArray(items)) {
    return (
      <ul className='list-group'>
        {
          Object.keys(items).map((item) => (
            <li key={items[item][valueProperty]} className={'list-group-item' + (items[item] === currentItem ? ' active' : '')} onClick={() => onItemSelect(items[item])} role='button'>{items[item][contentProperty]}</li>
          ))
        }
      </ul>
    );
  }
  return (
    <ul className='list-group'>
      {items.map(item => {
        return <li key={item[valueProperty]} className={'list-group-item' + (item === currentItem ? ' active' : '')} onClick={() => onItemSelect(item)} role='button'>{item[contentProperty]}</li>;
      })}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  currentItem: PropTypes.object
};

export default GroupList;
