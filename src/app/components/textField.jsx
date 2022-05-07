import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, value, onChange, error }) => {
  const getInputClasses = () => {
    return `form-control ${error ? 'is-invalid' : ''}`;
  };

  return (
    <div className="mb-4">
      <label htmlFor="email">{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        className={getInputClasses()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
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
