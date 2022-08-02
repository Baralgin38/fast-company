import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ _id, color, name }) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

Quality.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
};

export default Quality;
