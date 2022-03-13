const dynamicSort = ({ column, order }) => {
  const result = order === 'asc' ? 1 : -1;
  return (a, b) => {
    if (a[column] > b[column]) return result;
    if (a[column] < b[column]) return -result;
    return 0;
  };
};

const tryToRemoveColumns = ({ constTableWidth, width, state }) => {
  const { columns } = state;
  let tableWidth = constTableWidth;
  const visibleColumns = columns.filter(column => column.isVisible);
  const hiddenColumns = columns.filter(column => !column.isVisible);

  visibleColumns.sort(dynamicSort({ column: 'priorityLevel', order: 'asc' }));
  while (tableWidth > width && visibleColumns.length > 1) {
    const removedColumn = visibleColumns.pop();
    hiddenColumns.push({ ...removedColumn, isVisible: false });
    tableWidth -= removedColumn.minWidth;
  }
  if (visibleColumns.length === 1) {
    const firstColumn = visibleColumns.shift();
    visibleColumns.push({ ...firstColumn, minWidth: width, prevWidth: firstColumn.minWidth });
  }
  const combinedColumns = [...visibleColumns, ...hiddenColumns];
  combinedColumns.sort(dynamicSort({ column: 'position', order: 'asc' }));
  return { ...state, columns: combinedColumns };
};

const closeAllRows = ({ rows }) => {
  return rows.map(row => ({ ...row, isOpen: undefined }));
};

const tryToAddColumns = ({ constTableWidth, width, state }) => {
  const { columns, rows } = state;
  let tableWidth = constTableWidth;
  const visibleColumns = columns.filter(column => column.isVisible);
  const hiddenColumns = columns.filter(column => !column.isVisible);
  hiddenColumns.sort(dynamicSort({ column: 'priorityLevel', order: 'desc' }));

  if (visibleColumns.length === 1) {
    const firstColumn = visibleColumns.shift();
    visibleColumns.unshift({ ...firstColumn, minWidth: firstColumn.prevWidth || firstColumn.minWidth });
  }
  while (tableWidth < width && hiddenColumns.length) {
    const addedColumn = hiddenColumns.pop();
    tableWidth += addedColumn.minWidth;
    if (
      tableWidth > width ||
      (state.priorityLevelThreshold && addedColumn.priorityLevel >= state.priorityLevelThreshold)
    ) {
      hiddenColumns.push(addedColumn);
      break;
    }
    visibleColumns.push({ ...addedColumn, isVisible: true });
  }

  if (visibleColumns.length === 1) {
    const firstColumn = visibleColumns.shift();
    visibleColumns.push({ ...firstColumn, minWidth: width, prevWidth: firstColumn.minWidth });
  }

  if (visibleColumns.length > 1) {
    const firstColumn = visibleColumns.shift();
    visibleColumns.unshift({
      ...firstColumn,
      minWidth: firstColumn.prevWidth || firstColumn.minWidth,
      prevWidth: null,
    });
  }

  const newRows = hiddenColumns.length ? rows : closeAllRows({ rows });
  const newColumns = [...visibleColumns, ...hiddenColumns];
  newColumns.sort(dynamicSort({ column: 'position', order: 'asc' }));
  return { ...state, columns: newColumns, rows: newRows };
};

export const resizeTable = ({ width, state }) => {
  const { columns } = state;
  const visibleColumns = columns.filter(column => column.isVisible);
  const tableWidth = visibleColumns.reduce((prevValue, { minWidth, prevWidth }) => {
    if (prevWidth) return prevValue + prevWidth;
    return prevValue + minWidth;
  }, 0);
  const newState =
    tableWidth > width
      ? tryToRemoveColumns({ constTableWidth: tableWidth, width, state })
      : tryToAddColumns({ constTableWidth: tableWidth, width, state });

  return newState;
};

export const expandRow = ({ rowIndex, state }) => {
  const { rows } = state;
  const newRows = rows.map(row => (row.id === rowIndex ? { ...row, isOpen: !row.isOpen } : row));
  return { ...state, rows: newRows };
};
