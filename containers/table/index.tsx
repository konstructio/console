import React, { FunctionComponent, useState } from 'react';

import TableComponent, { TableProps } from '../../components/table';

const Table: FunctionComponent<TableProps> = ({ ...props }) => {
  const [rows, setRows] = useState(props.rows);

  const handleClickRow = (id: string) => {
    setRows((selectedRows) =>
      selectedRows.map((row) => {
        const isRow = id === row.id;
        return { ...row, selected: isRow ? !row.selected : row.selected };
      }),
    );
  };

  return <TableComponent {...props} rows={rows} onClickRow={handleClickRow} />;
};

export default Table;
