import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import professionService from '../services/profession.service';

const ProfessionContext = React.createContext();

export const useProfession = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [setError] = useState(null);

  const errorCatcher = (error) => {
    setError(error);
  };

  async function getProfessions() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getProfessionById(id) {
    return professions.find((profession) => profession._id === id);
  }

  useEffect(() => {
    getProfessions();
  }, []);

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfessionById }}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
