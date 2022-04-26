import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
        caret: selectedSort.order === 'asc' ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill',
        currentTH: item
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  return (
    <thead>
      <tr>
        {
          Object.keys(columns).map(column => <th key={column} onClick = {() => columns[column].path ? handleSort(columns[column].path) : undefined} {...{ role: columns[column].path && 'button' }} scope='col'>{columns[column].name} {columns[column].path === selectedSort.currentTH ? <i className={selectedSort.caret}></i> : null} </th>)
        }
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default TableHeader;
