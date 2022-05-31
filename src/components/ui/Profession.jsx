import { useProfession } from '../../hooks/useProfession';
import PropTypes from 'prop-types';

const Profession = ({ id }) => {
  const { isLoading, getProfessionById } = useProfession();
  const profession = getProfessionById(id);
  if (!isLoading) {
    return <p>{profession.name}</p>;
  } else return <p>is loading...</p>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
