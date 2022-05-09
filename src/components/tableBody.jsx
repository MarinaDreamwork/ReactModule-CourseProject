import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const TableBody = ({ data, columns }) => {
  // const isSearched = searchFieldData || data;
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === 'function') {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };
  return (
    <>
      <tbody>
        {
          data.map(item => <tr key={item._id}>
            {
              Object.keys(columns).map(column => (
                columns[column].name === 'Имя'
                  ? <Link key={item._id} className='nav-link' to={`users/${item._id}`}> {item.name}</Link>
                  : <td key={column}>
                    {renderContent(item, column)}
                  </td>))
            }
          </tr>
          )
        }
      </tbody>
    </>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};
export default TableBody;
