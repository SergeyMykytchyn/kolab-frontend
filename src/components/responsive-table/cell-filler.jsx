import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const CellFiller = ({ className, children, maxWidth, width, ...props }) => (
  <td
    {...props}
    className={`tableCell tableCellFiller ${className}`}
    style={{ maxWidth: `${maxWidth}px`, width: `${width}px` }}
  >
    <div className="fillerWrapper">
      <div className="filler" />
    </div>
  </td>
);

CellFiller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  width: PropTypes.number,
};

CellFiller.defaultProps = {
  className: null,
  children: null,
  maxWidth: null,
  width: null,
};

export { CellFiller };
