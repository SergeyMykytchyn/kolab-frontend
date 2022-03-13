import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';

import Columns from './columns';
import Rows from './rows';
import { expandRow, resizeTable } from './table-actions';
import './styles.css';

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      rows: props.rows,
      priorityLevelThreshold: props.priorityLevelThreshold,
      props,
    };

    this.divRef = React.createRef();

    this.resizeTable = this.resizeTable.bind(this);
    this.expandRow = this.expandRow.bind(this);
  }

  static getDerivedStateFromProps(newProps, state) {
    if (newProps.rows !== state.props.rows) {
      return { ...state, rows: newProps.rows, props: newProps };
    }
    return state;
  }

  componentDidMount() {
    this.divSizeObserver = new ResizeObserver(
      throttle(entries => {
        // eslint-disable-next-line array-callback-return
        entries.map(entry => {
          this.resizeTable(entry.contentRect.width);
          this.setState(currentState => {
            return { ...currentState, containerWidth: this.divRef.current.offsetWidth };
          });
        });
      }),
      150,
    );
    this.divSizeObserver.observe(this.divRef.current);
    this.resizeTable(this.divRef.current.offsetWidth);
    this.setState(currentState => {
      return { ...currentState, containerWidth: this.divRef.current.offsetWidth };
    });
  }

  componentWillUnmount() {
    this.divSizeObserver.disconnect();
  }

  expandRow(rowIndex) {
    this.setState(currentState => {
      return expandRow({ rowIndex, state: currentState });
    });
  }

  resizeTable(width) {
    this.setState(currentState => {
      return resizeTable({ width, state: currentState });
    });
  }

  render() {
    const { columns, rows, containerWidth } = this.state;
    const visibleColumns = columns.filter(column => column.isVisible);
    const hiddenColumns = columns.filter(column => !column.isVisible);
    return (
      <div className="page" ref={this.divRef}>
        <table className="pageTable">
          <Columns columns={visibleColumns} sort={this.props.sort} handleSort={this.props.handleSort} />
          <Rows
            rows={rows}
            itemsPerPage={this.props.itemsPerPage}
            visibleColumns={visibleColumns}
            hiddenColumns={hiddenColumns}
            expandRow={this.expandRow}
            containerWidth={containerWidth}
          />
        </table>
      </div>
    );
  }
}

Table.defaultProps = {
  columns: [],
  rows: [],
  itemsPerPage: null,
  priorityLevelThreshold: null,
  sort: null,
  handleSort: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      priorityLevel: PropTypes.number,
      position: PropTypes.number,
      minWidth: PropTypes.number,
      isVisible: PropTypes.bool,
    }),
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.object,
      isOpen: PropTypes.bool,
    }),
  ),
  itemsPerPage: PropTypes.number,
  priorityLevelThreshold: PropTypes.number,
  sort: PropTypes.shape({
    sort: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  handleSort: PropTypes.func,
};
