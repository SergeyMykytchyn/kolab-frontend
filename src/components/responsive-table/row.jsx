import React from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';

const Row = ({ row, rowIndex, visibleColumns, hiddenColumns, expandRow }) => {
  const cells = visibleColumns.map(({ accessor, minWidth, CustomComponent }, index) => {
    return (
      <Cell
        key={accessor}
        accessor={accessor}
        minWidth={minWidth}
        cellIndex={index}
        row={row}
        rowIndex={rowIndex}
        expandRow={expandRow}
        hiddenColumnLength={hiddenColumns.length}
        CustomComponent={CustomComponent}
      />
    );
  });

  return <tr className="row">{cells}</tr>;
};

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.object,
    isOpen: PropTypes.bool,
  }).isRequired,
  rowIndex: PropTypes.string.isRequired,
  visibleColumns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      priorityLevel: PropTypes.number,
      position: PropTypes.number,
      minWidth: PropTypes.number,
      isVisible: PropTypes.bool,
    }),
  ).isRequired,
  hiddenColumns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      priorityLevel: PropTypes.number,
      position: PropTypes.number,
      minWidth: PropTypes.number,
      isVisible: PropTypes.bool,
    }),
  ).isRequired,
  expandRow: PropTypes.func.isRequired,
};

export default Row;
