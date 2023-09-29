import styled from 'styled-components';
import { styled as muiStyled, typographyClasses } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ColumnComponent from '../column';
import RowComponent from '../row';
import Typography from '../typography';
import NextLink from '../nextLink';
import {
  CHEFS_HAT,
  DR_WHITE,
  EXCLUSIVE_PLUM,
  TRUE_BLUE,
  VOLCANIC_SAND,
} from '../../constants/colors';

export const Container = styled(ColumnComponent)`
  width: 100%;
  gap: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ColumnInfo = styled(ColumnComponent)`
  gap: 8px;
  justify-content: space-between;
`;

export const InfoIcon = styled(InfoOutlinedIcon)`
  color: ${TRUE_BLUE};
  height: 20px;
  width: 20px;
`;

export const Link = styled.a`
  display: inline-flex;
  a {
    color: ${TRUE_BLUE};
  }
`;

export const RowInfo = styled(RowComponent)`
  gap: 156px;
`;

export const StatusContainer = styled(RowComponent)`
  gap: 8px;
  padding: 16px;
  background-color: ${DR_WHITE};
  border: 1px solid ${CHEFS_HAT};
  border-radius: 4px;
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
