import React from 'react';
import PropTypes from 'prop-types';
import { useQuality } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
  const { getQuality } = useQuality();

  const qual = getQuality(id);

  return <span className={`badge bg-${qual.color} m-1`}>{qual.name}</span>;
};

Quality.propTypes = {
  id: PropTypes.string
};

export default Quality;
