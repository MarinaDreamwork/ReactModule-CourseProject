import TableBody from './tableBody';
import TableHeader from './tableHeader';
import PropTypes from 'prop-types';

const Table = ({ columns, onSort, selectedSort, data }) => {
  return (
    <table className='table table-hover'>
      <TableHeader columns={columns} {...{ onSort, selectedSort }}/>
      <TableBody {...{ columns, data }}/>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.object,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  data: PropTypes.array
};

export default Table;
