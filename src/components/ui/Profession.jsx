import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionLoading, getProfessions } from '../../store/profession';

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionLoading());
  const professions = useSelector(getProfessions());
  const profession = professions.filter(prof => prof._id === id);
  if (!isLoading) {
   return <>
    {
      profession.map(prof => (
        <p key={prof._id}>
          {prof.name}
        </p>
      ))
    }
   </>;
  } else return <p>is loading...</p>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
