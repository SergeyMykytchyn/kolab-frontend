import React from 'react';
import PropTypes from 'prop-types';
import AnimatedHeight from 'react-animate-height';
import './styles.css';

const ExpandedRow = ({ row, hiddenColumns, visibleColumns, containerWidth }) => {
  const expandedRows = hiddenColumns.map(column => {
    return (
      <div key={column.accessor} className="pageTableHiddenCellContent">
        <span className="pageTableHiddenCellContentLabel">
          {column.label}
        </span>
        <span className="pageTableHiddenCellContentText">
          {row.data[column.accessor]}
        </span>
      </div>
    );
  });
  const tableWidth = visibleColumns.reduce((prevValue, { minWidth, prevWidth }) => {
    if (prevWidth) return prevValue + prevWidth;
    return prevValue + minWidth;
  }, 0);
  const expandedRowWidth = visibleColumns.length === 1 ? containerWidth : tableWidth;
  return (
    <tr>
      <td colSpan={visibleColumns.length}>
        <AnimatedHeight duration={500} height={row.isOpen ? 'auto' : 0}>
          <div
            className="pageTableHiddenCell"
            style={{
              maxWidth: `${expandedRowWidth}px`,
              width: `${expandedRowWidth}px`,
              minWidth: `${expandedRowWidth}px`,
            }}
          >
            {expandedRows}
          </div>
        </AnimatedHeight>
      </td>
    </tr>
  );
};

ExpandedRow.defaultProps = {
  containerWidth: null,
};

ExpandedRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.object,
    isOpen: PropTypes.bool,
  }).isRequired,
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
  containerWidth: PropTypes.number,
};

export default ExpandedRow;
