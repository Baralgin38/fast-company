import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ value, onChange, onClear }) => {
  return (
    <div className="input-group">
      <input
        className="form-control"
        placeholder="Search.."
        onChange={onChange}
        value={value}
      />
      <button
        type="button"
        className="btn btn-outline-primary"
        disabled={!value}
        onClick={onClear}
      >
        <i className="bi bi-x-lg" />
      </button>
    </div>
  );
};

SearchField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func
};

export default SearchField;
