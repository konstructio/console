import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  TableBody,
  TableRow,
  tableRowClasses,
  tableBodyClasses,
  IconButton,
  iconButtonClasses,
  typographyClasses,
} from '@mui/material';

import Typography from '../typography';
import Tag from '../tag';
import { PASTEL_LIGHT_BLUE, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

export const StyledIconButton = muiStyled(IconButton)(() => ({
  [`&.${iconButtonClasses.root}`]: {
    opacity: 0,
    pointerEvents: 'none',
  },
}));

export const StyledTableBody = muiStyled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {
    borderRadius: '20px',
    boxShadow: `0 0 0 2px ${PASTEL_LIGHT_BLUE}`,
  },
}));
export const StyledTableCell = muiStyled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    border: 0,
  },
}));

export const StyledTag = styled(Tag)`
  width: fit-content;
`;

export const StyledTableRow = muiStyled(TableRow)(() => ({
  [`&.${tableRowClasses.root}`]: {
    border: 0,
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
