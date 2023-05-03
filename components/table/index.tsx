import React, { FunctionComponent, ReactNode } from 'react';
import { Box } from '@mui/material';
import { DataGrid, DataGridProps, gridClasses } from '@mui/x-data-grid';

import { CHILD_OF_LIGHT, SALTBOX_BLUE } from '../../constants/colors';
import { Row } from '../../types';
import { typographies } from '../../theme/muiTheme';

export interface TableProps {
  cols: Array<string>;
  rows: Array<Row>;
  onClickRow?: (id: string) => void;
  hasActionMenu?: boolean;
  menuOptions?: Array<{ label: string; icon?: ReactNode; color?: string }>;
  onClickMenu: (label: string, row: Row) => void;
}

const Table: FunctionComponent<DataGridProps> = ({ ...props }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        {...props}
        hideFooter
        disableColumnFilter
        disableColumnMenu
        disableRowSelectionOnClick
        rowHeight={44}
        sx={{
          [`.${gridClasses.columnHeaders}`]: {
            height: '44px',
            minHeight: '44px !important',
          },
          [`.${gridClasses.columnHeader}`]: {
            background: CHILD_OF_LIGHT,
            color: SALTBOX_BLUE,
            textTransform: 'uppercase',
            ...typographies.labelMedium,
          },
          [`.${gridClasses.columnSeparator}`]: {
            display: 'none',
          },
          '.MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          [`.${gridClasses.columnHeader}:focus-within`]: {
            outline: 'none !important',
          },
        }}
      />
    </Box>
  );
};

export default Table;
