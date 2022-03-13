import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Icon = ({ icon, className, ...props }) => (
  <svg className={`icon ${className}`} viewBox={icon} {...props} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>24px / down</title>
    <desc>Created with Sketch.</desc>
    <g id="24px-/-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect id="rect24px-/-down" x="0" y="0" width="24" height="24"></rect>
        <path d="M12.8033009,16.6530891 L14.8068691,14.6697808 C15.003121,14.4755134 15.3196994,14.4771221 15.5139668,14.673374 C15.7082342,14.8696259 15.7066254,15.1862043 15.5103735,15.3804717 L13.0193416,17.8463145 C12.6282474,18.2334539 11.9978521,18.2318522 11.6087304,17.8427304 L9.14644661,15.3804467 C8.95118446,15.1851846 8.95118446,14.8686021 9.14644661,14.6733399 C9.34170876,14.4780778 9.65829124,14.4780778 9.85355339,14.6733399 L11.8033009,16.6230874 L11.8033009,6.5 C11.8033009,6.22385763 12.0271585,6 12.3033009,6 C12.5794432,6 12.8033009,6.22385763 12.8033009,6.5 L12.8033009,16.6530891 Z" id="arrowdown" fill="currentColor"></path>
    </g>
  </svg>
);

const HeaderCell = ({ label, minWidth, sortName, handleSort, sort }) => {
  const handleSortClick = (name, direction) => () => {
    if (handleSort) handleSort(name, direction);
  };
  const asc = sort && sort.direction === 'asc' && sort.sort === sortName;
  const desc = sort && sort.direction === 'desc' && sort.sort === sortName;
  return (
    <th
      className={"pageTableHeaderCell pageTableCell"}
      style={{ maxWidth: `${minWidth}px`, width: `${minWidth}px`, minWidth: `${minWidth}px` }}
    >
      <button
        className={`pageTableHeaderCellContent ${!sortName ? "pageTableHeaderCellContentDisable" : null}`}
        onClick={handleSortClick(sortName, sort && sort.direction)}
      >
        <span style={{ fontWeight: 600, fontSize: "14px" }}>{label}</span>
        {(asc || desc) && (
          <Icon
            className={`pageTableHeaderCellContentIcon ${desc ? "pageTableHeaderCellContentIconDesc" : null}`}
          />
        )}
      </button>
    </th>
  );
};

HeaderCell.defaultProps = {
  sortName: null,
  sort: null,
  handleSort: null,
};

HeaderCell.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  minWidth: PropTypes.number.isRequired,
  sortName: PropTypes.string,
  sort: PropTypes.shape({
    sort: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  handleSort: PropTypes.func,
};

export default HeaderCell;
