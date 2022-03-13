import React from 'react';
import PropTypes from 'prop-types';
import { TRow } from './trow';
import { CellFiller } from './cell-filler';

const TableFiller = ({ className, children, ...props }) => {
  const { rows, columns } = props;
  const width = 100 / columns;
  const fillerRender = [...Array(rows)].map(() => (
    <TRow key="key">
      {[...Array(columns)].map(() => (
        <CellFiller key="filler-key" width={`${width}%`} />
      ))}
    </TRow>
  ));
  return <>{fillerRender}</>;
};

TableFiller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number,
};

TableFiller.defaultProps = {
  className: null,
  children: null,
  columns: 5,
};

export { TableFiller };
