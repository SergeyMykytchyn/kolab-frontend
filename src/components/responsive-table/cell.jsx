import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ButtonIconWrapper = ({ type, className, children, ...props }) => {
  return (
    <button aria-label={children} type={type} className={`button buttonIcon ${className}`} {...props}>
      {children}
    </button>
  );
};

const ButtonIcon = ({ iconClassName, icon, ...props }) => (
  <ButtonIconWrapper {...props} id={props.id || `button-icon-id-${icon}`}>
    <svg width="100%" height="100%" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
      <title>18px / arrow</title>
      <desc>Created with Sketch.</desc>
      <g id="18px-/-arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect id="rect18px-/-arrow" x="0" y="0" width="18" height="18"></rect>
          <path d="M6.64644661,4.35355339 C6.45118446,4.15829124 6.45118446,3.84170876 6.64644661,3.64644661 C6.84170876,3.45118446 7.15829124,3.45118446 7.35355339,3.64644661 L12.4092233,8.70211655 C12.7997476,9.09264084 12.7997476,9.72580582 12.4092233,10.1163301 L7.35355339,15.172 C7.15829124,15.3672622 6.84170876,15.3672622 6.64644661,15.172 C6.45118446,14.9767379 6.45118446,14.6601554 6.64644661,14.4648933 L11.7021165,9.40922333 L6.64644661,4.35355339 Z" id="arrow" fill="currentColor" fillRule="nonzero"></path>
      </g>
    </svg>
  </ButtonIconWrapper>
);

const Cell = ({ accessor, minWidth, cellIndex, row, rowIndex, expandRow, hiddenColumnLength, CustomComponent }) => {
  const IS_FIRST_CELL = cellIndex === 0;
  const IS_HIDDEN_COLUMNS = hiddenColumnLength !== 0;
  const icon =
    IS_FIRST_CELL && IS_HIDDEN_COLUMNS ? (
      <ButtonIcon
        className={`
          pageTableCellButtonIcon
          ${row.isOpen === true ? "animationIconOpen" : null}
          ${row.isOpen === false ? "animationIconClose" : null}
        `}
        onClick={() => {
          expandRow(rowIndex);
        }}
      />
    ) : null;
  const content = CustomComponent ? (
    <CustomComponent row={row} rowIndex={rowIndex} cellIndex={cellIndex} accessor={accessor} />
  ) : (
    <>{row.data[accessor]}</>
  );
  return (
    <td
      className="pageTableCell"
      style={{ maxWidth: `${minWidth}px`, width: `${minWidth}px`, minWidth: `${minWidth}px` }}
    >
      <div className="pageTableCellContent">
        {icon}
        {content}
      </div>
    </td>
  );
};

Cell.defaultProps = {
  CustomComponent: null,
};

Cell.propTypes = {
  accessor: PropTypes.string.isRequired,
  minWidth: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.string.isRequired,
  row: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.object,
    isOpen: PropTypes.bool,
  }).isRequired,
  expandRow: PropTypes.func.isRequired,
  hiddenColumnLength: PropTypes.number.isRequired,
  CustomComponent: PropTypes.func,
};

export default Cell;
