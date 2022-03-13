import React from 'react';
import PropTypes from 'prop-types';
import { TableFiller } from './table-filler';
import Row from './row';
import ExpandedRow from './expanded-row';
import './styles.css';

const Rows = ({ rows, itemsPerPage, visibleColumns, hiddenColumns, expandRow, containerWidth }) => {
  const tableRows = rows.reduce((r, row) => {
    const rowComponent = (
      <Row
        key={`${row.id}-1`}
        row={row}
        rowIndex={row.id}
        visibleColumns={visibleColumns}
        hiddenColumns={hiddenColumns}
        expandRow={expandRow}
      />
    );
    const expandedRowComponent = (
      <ExpandedRow
        key={`${row.id}-2`}
        row={row}
        hiddenColumns={hiddenColumns}
        visibleColumns={visibleColumns}
        containerWidth={containerWidth}
      />
    );
    r.push(rowComponent);
    r.push(expandedRowComponent);
    return r;
  }, []);
  let tbody = <tbody></tbody>;
  if (tableRows.length) {
    tbody = (
      <tbody>
        {/* <div className="pageTableContentFake" /> */}
        {tableRows}
        {/* <div className="pageTableContentFake" /> */}
      </tbody>
    );
  } else if (visibleColumns.length && itemsPerPage) {
    tbody = <TableFiller columns={visibleColumns.length} rows={itemsPerPage} />;
  }
  return tbody;
};

Rows.defaultProps = {
  rows: [],
  itemsPerPage: null,
  visibleColumns: [],
  hiddenColumns: [],
  containerWidth: null,
};

Rows.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.object,
      isOpen: PropTypes.bool,
    }),
  ),
  itemsPerPage: PropTypes.number,
  visibleColumns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      priorityLevel: PropTypes.number,
      position: PropTypes.number,
      minWidth: PropTypes.number,
      isVisible: PropTypes.bool,
    }),
  ),
  hiddenColumns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      priorityLevel: PropTypes.number,
      position: PropTypes.number,
      minWidth: PropTypes.number,
      isVisible: PropTypes.bool,
    }),
  ),
  expandRow: PropTypes.func.isRequired,
  containerWidth: PropTypes.number,
};

export default Rows;
