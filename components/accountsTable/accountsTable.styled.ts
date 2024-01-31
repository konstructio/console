'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import { typographyClasses } from '@mui/material/Typography';

import Typography from '../typography';
import {
  CHEFS_DARK_HAT,
  CHILD_OF_LIGHT,
  SALTBOX_BLUE,
  VOLCANIC_SAND,
  WHITE,
} from '../../constants/colors';
import Column from '../column';

export const StyledTableBody = muiStyled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {},
}));

export const StyledTableCell = muiStyled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    borderBottom: `1px solid  ${CHEFS_DARK_HAT}`,
    backgroundColor: 'white',
  },
}));

export const StyledHeaderCell = muiStyled(StyledTableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    backgroundColor: CHILD_OF_LIGHT,
  },
}));

export const StyledTableRow = muiStyled(TableRow)(() => ({
  ['&:first-child th:first-child']: {
    borderTopLeftRadius: '8px',
  },
  ['&:first-child th:last-child']: {
    borderTopRightRadius: '8px',
  },
}));

export const StyledTableHeading = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: SALTBOX_BLUE,
  },
}));

export const StyledCellText = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: VOLCANIC_SAND,
    fontWeight: 400,
  },
}));

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  margin: 5px;
  height: fit-content;
  margin: 0;
`;

export const StyledTableContainer = styled(Column)``;

export const SearchHeader = styled.div`
  align-items: center;
  background: ${WHITE};
  border-radius: 4px 4px 0px 0px;
  display: flex;
  padding: 16px 24px;
`;
