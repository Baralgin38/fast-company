import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ peopleNumber }) => {
  let classes = 'badge m-2 ';

  const getDeclinationPrhase = (count) => {
    if (
      (count % 100 < 11 || count % 100 > 14) &&
      (count % 10 === 2 || count % 10 === 3 || count % 10 === 4)
    ) {
      return 'человека тусанёт';
    } else if (count % 100 === 1 || (count % 100) % 10 === 1) {
      return 'человек тусанёт';
    }

    return 'человек тусанут';
  };

  if (peopleNumber === 0) {
    classes += 'bg-danger';
    return (
      <h2>
        <span className={classes}>Никто с тобой сегодня не тусанёт :(</span>
      </h2>
    );
  }

  classes += 'bg-primary';
  return (
    <h2>
      <span className={classes}>
        {peopleNumber} {getDeclinationPrhase(peopleNumber)} с тобой сегодня
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  peopleNumber: PropTypes.number.isRequired
};

export default SearchStatus;
