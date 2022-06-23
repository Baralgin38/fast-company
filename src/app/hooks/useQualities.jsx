import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qualityService from '../services/quality.service';
import { toast } from 'react-toastify';

const QualitiesContext = React.createContext();

export const useQuality = () => {
  return useContext(QualitiesContext);
};

export const QualityProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualities();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getQualities() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getQuality(id) {
    return qualities.find((qual) => qual._id === id);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <QualitiesContext.Provider value={{ isLoading, getQuality, qualities }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
