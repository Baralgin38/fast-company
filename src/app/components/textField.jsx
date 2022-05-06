import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div>
      <label className="m-3 mb-1" htmlFor="email">
        {label}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <p className="ms-3">{error}</p>}
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextField;
