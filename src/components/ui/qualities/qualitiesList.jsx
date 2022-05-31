import Qualities from './qualitie';
import PropTypes from 'prop-types';
import { useQuality } from '../../../hooks/useQuality';

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQualitiesById } = useQuality();
  if (!isLoading) {
    return (
      <>
        { qualities.map(quality =>
          <Qualities
            key={getQualitiesById(quality)._id}
            color={getQualitiesById(quality).color}
            name={getQualitiesById(quality).name}
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
