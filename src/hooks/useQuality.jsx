import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qualityService from '../services/quality.service';

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [setError] = useState(null);

  const errorCatcher = (error) => {
    setError(error);
  };

  async function getQualities() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getQualitiesById(id) {
    return qualities.find((quality) => quality._id === id);
  }

  useEffect(() => {
    getQualities();
  }, []);

  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQualitiesById }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
