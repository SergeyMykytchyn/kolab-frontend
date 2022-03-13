import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './header-cell';
import './styles.css';

const Columns = ({ columns, sort, handleSort }) => {
  const tableColumns = columns.map(({ accessor, sortName, ...props }) => {
    return <HeaderCell key={accessor} sort={sort} handleSort={handleSort} sortName={sortName} {...props} />;
  });

  return (
    <thead>
      <tr className="pageTableHeader">{tableColumns}</tr>
    </thead>
  );
};

Columns.defaultProps = {
  columns: [],
  sort: null,
  handleSort: null,
};

Columns.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string,
      label: PropTypes.object,
      priorityLevel: PropTypes.number,
      position: PropTypes.number,
      minWidth: PropTypes.number,
      isVisible: PropTypes.bool,
    }),
  ),
  sort: PropTypes.shape({
    sort: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  handleSort: PropTypes.func,
};

export default Columns;
