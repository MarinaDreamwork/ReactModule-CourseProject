import TableBody from './tableBody';
import TableHeader from './tableHeader';
import PropTypes from 'prop-types';

const Table = ({ columns, onSort, selectedSort, data, searchFieldData }) => {
  return (
    <table className='table table-hover'>
      <TableHeader columns={columns} {...{ onSort, selectedSort }}/>
      <TableBody {...{ columns, data, searchFieldData }}/>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.object,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  data: PropTypes.array,
  searchFieldData: PropTypes.array
};

export default Table;
