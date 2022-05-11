import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ status, ...rest }) => {
  return (
    <button {...rest} className="btn btn-primary btn-sm">
      <span
        className={'bi bi-bookmark' + (status ? '-check' : '')}
        style={{ fontSize: '1.5em' }}
      ></span>
    </button>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Bookmark;
