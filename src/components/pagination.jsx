import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ usersCount, pageSize, currentPage, onChangeClick }) => {
  const count = Math.ceil(usersCount / pageSize);
  if (count === 1) return null;
  const paginationItems = _.range(1, count + 1);
  return (
    <nav>
      <ul className='pagination'>
        {
          paginationItems.map(page => (
            <li className={'page-item' + (page === currentPage ? ' active' : '')} key={page}>
              <button className='page-link' onClick={() => onChangeClick(page)}>
                {page}
              </button>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  usersCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangeClick: PropTypes.func.isRequired
};

export default Pagination;
