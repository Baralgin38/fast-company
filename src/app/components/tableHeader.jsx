import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSortClick = (item) => {
    if (selectedSort.path === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const addSortMarker = (currentSortItem, currentItem) => {
    if (currentSortItem.path && currentSortItem.path === currentItem.path) {
      const caretClass = `bi bi-caret-${
        currentSortItem.order === 'desc' ? 'down-fill' : 'up-fill'
      }`;
      return <span className={caretClass}></span>;
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSortClick(columns[column].path)
                : undefined
            }
            role={columns[column].path && 'button'}
            scope="col"
          >
            {columns[column].name}
            {addSortMarker(selectedSort, columns[column])}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
