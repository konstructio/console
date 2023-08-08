import styled from 'styled-components';
import { styled as muiStyled, typographyClasses } from '@mui/material';

import ColumnComponent from '../column';
import RowComponent from '../row';
import Typography from '../typography';
import { EXCLUSIVE_PLUM, VOLCANIC_SAND } from '../../constants/colors';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Column = styled(ColumnComponent)`
  gap: 8px;
  justify-content: space-between;
`;

export const Row = styled(RowComponent)`
  gap: 156px;
`;

export const StyledLabel = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: EXCLUSIVE_PLUM,
    width: '196px',
  },
}));

export const StyledValue = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: VOLCANIC_SAND,
    width: '196px',
  },
}));
