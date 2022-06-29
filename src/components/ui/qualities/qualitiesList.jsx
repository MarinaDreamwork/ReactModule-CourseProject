import Qualities from './qualitie';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getQualitiesLoadingStatus, getQualitiesByIds } from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
  console.log('quality', qualities);
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  if (!isLoading) {
    return (
      <>
        { qualitiesList.map(quality =>
          <Qualities
            key={quality._id}
            color={quality.color}
            name={quality.name}
          />
        )}
      </>
    );
  } else return 'is loading...';
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
