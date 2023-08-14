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
  Box,
} from '@mui/material';

import Typography from '../typography';
import Tag from '../tag';
import { CHEFS_HAT, PASTEL_LIGHT_BLUE, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

export const Menu = styled(Box)`
  position: absolute;
  bottom: -40px;
  left: -110px;
  width: 160px;
  background-color: white;
  border: 1px solid ${CHEFS_HAT};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(100, 116, 139, 0.25);
  z-index: 1;
`;

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
    backgroundColor: 'white',
  },
}));

export const StyledHeaderCell = muiStyled(StyledTableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    backgroundColor: 'transparent',
  },
}));

export const StyledTag = styled(Tag)`
  width: fit-content;
`;

export const StyledTableRow = muiStyled(TableRow)(() => ({
  [`&.${tableRowClasses.root}`]: {
    border: 0,
    height: 'fit-content',
  },
  ['&:first-child td:first-child']: {
    borderTopLeftRadius: '20px',
  },
  ['&:first-child td:last-child']: {
    borderTopRightRadius: '20px',
  },
  ['&:last-child td:first-child']: {
    borderBottomLeftRadius: '20px',
  },
  ['&:last-child td:last-child']: {
    borderBottomRightRadius: '20px',
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
