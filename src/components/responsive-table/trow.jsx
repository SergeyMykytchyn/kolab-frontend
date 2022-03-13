import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const TRow = ({ className, children, alignTop, ...props }) => (
  <tr {...props} className={`tableRow ${className}`} style={{ verticalAlign: alignTop && 'top' }}>
    {children}
  </tr>
);

TRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  alignTop: PropTypes.bool,
};

TRow.defaultProps = {
  className: null,
  children: null,
  alignTop: false,
};

export { TRow };
