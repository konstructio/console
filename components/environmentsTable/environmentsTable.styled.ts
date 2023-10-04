import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  TableBody,
  TableRow,
  tableBodyClasses,
  typographyClasses,
  Box,
  Table,
} from '@mui/material';

import Row from '../row';
import Typography from '../typography';
import { CHEFS_HAT, CHILD_OF_LIGHT, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

export const Menu = styled(Box)`
  position: absolute;
  top: 60px;
  left: -110px;
  width: 160px;
  background-color: white;
  border: 1px solid ${CHEFS_HAT};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(100, 116, 139, 0.25);
  z-index: 1;
`;

export const StyledTableBody = muiStyled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {},
}));

export const StyledTableCell = muiStyled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    border: 0,
    borderBottom: '1px solid #F4F4F5',
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
  margin: 0 28px;
`;

export const StyledTableContainer = styled(Row)``;
