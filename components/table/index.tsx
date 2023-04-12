import React, { FunctionComponent } from 'react';
import {
  Paper,
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import Typography from '../typography';
import Checkbox from '../checkbox';

import { Container } from './table.styled';

export interface TableProps {
  cols: Array<string>;
  rows: Array<{ [key: string]: string }>;
}

const Table: FunctionComponent<TableProps> = ({ cols, rows }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#F1F5F9' }}>
              <Checkbox />
            </TableCell>
            {cols.map((col) => (
              <TableCell key={col} sx={{ backgroundColor: '#F1F5F9' }}>
                <Typography variant="labelMedium" color="#64748B">
                  {col?.toUpperCase()}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>
              <Checkbox />
            </TableCell>
            {Object.values(rows).map((row) => (
              <TableCell key={row as never}>{row as never}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
