import Qualities from './qualitie';
import PropTypes from 'prop-types';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map(quality => <Qualities key={quality._id} color={quality.color} name={quality.name} />) }
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
