import styled, { css } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  TableBody,
  TableRow,
  tableRowClasses,
  tableBodyClasses,
  IconButton,
  typographyClasses,
  Box,
  TableContainer,
  Table,
} from '@mui/material';

import Typography from '../typography';
import Tag from '../tag';
import {
  CHEFS_HAT,
  PASTEL_LIGHT_BLUE,
  ROCK_BLUE,
  SALTBOX_BLUE,
  VOLCANIC_SAND,
} from '../../constants/colors';

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

export const StyledIconButton = styled(IconButton)<{ expanded?: boolean }>`
  svg {
    color: ${ROCK_BLUE};
    transition: transform 0.3s ease;
  }

  ${({ expanded }) =>
    expanded &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;

export const StyledTableBody = muiStyled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {
    borderRadius: '20px',
    boxShadow: `0 0 0 2px ${PASTEL_LIGHT_BLUE}`,
  },
}));

export const StyledTableCell = muiStyled(TableCell)<{ selected?: boolean }>(({ selected }) => ({
  [`&.${tableCellClasses.root}`]: {
    border: 0,
    backgroundColor: selected ? '#FAF5FF' : 'white',
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

export const StyledTableRow = muiStyled(TableRow)<{ selected?: boolean }>(({ selected }) => ({
  [`&.${tableRowClasses.root}`]: {
    border: 0,
    height: 'fit-content',
  },
  [`&.${tableRowClasses.root}.Mui-selected`]: {
    backgroundColor: 'transparent',
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

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  margin: 5px;
  height: fit-content;
  margin: 0 28px;
`;

export const StyledTableContainer = styled(TableContainer)`
  display: flex;
  height: 100%;
`;
