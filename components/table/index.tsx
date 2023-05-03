import React, { FunctionComponent, ReactNode } from 'react';
import {
  Paper,
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Typography from '../typography';
import Menu from '../menu';
import { CHILD_OF_LIGHT, SALTBOX_BLUE } from '../../constants/colors';

export interface Row {
  [key: string]: unknown | ReactNode;
  id: string;
  selected?: boolean;
}

export interface TableProps {
  cols: Array<string>;
  rows: Array<Row>;
  onClickRow?: (id: string) => void;
  hasActionMenu?: boolean;
  menuOptions?: Array<{ label: string; icon?: ReactNode; color?: string }>;
  onClickMenu: (label: string, row: Row) => void;
}

const Table: FunctionComponent<TableProps> = ({
  cols,
  hasActionMenu,
  menuOptions,
  onClickRow,
  onClickMenu,
  rows,
}) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell key={col} sx={{ backgroundColor: CHILD_OF_LIGHT }}>
                <Typography variant="labelMedium" color={SALTBOX_BLUE}>
                  {col?.toUpperCase()}
                </Typography>
              </TableCell>
            ))}
            {hasActionMenu && <TableCell sx={{ backgroundColor: CHILD_OF_LIGHT }}></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, index) => {
              const { id, ...rest } = row;
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => {
                    onClickRow && onClickRow(id);
                  }}
                >
                  {Object.values(rest).map((rowData, index) => (
                    <TableCell
                      align={typeof rowData !== 'string' ? 'center' : 'left'}
                      key={`${rowData}-${index}`}
                      sx={{ width: typeof rowData !== 'string' ? '90px' : 'auto' }}
                    >
                      {rowData as never}
                    </TableCell>
                  ))}
                  {hasActionMenu && (
                    <TableCell>
                      <Menu
                        onClickMenu={(label) => onClickMenu(label, row)}
                        label={<MoreHorizIcon />}
                        options={menuOptions}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
