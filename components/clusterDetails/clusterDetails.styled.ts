'use client';
import styled, { css } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';

import ColumnComponent from '@/components/column';
import RowComponent from '@/components/row';
import Typography from '@/components/typography';
import { EXCLUSIVE_PLUM, PRIMARY, SPUN_PEARL, VOLCANIC_SAND } from '@/constants/colors';

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

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})<{ available?: boolean }>`
  font-size: 14px;
  text-decoration: none;
  color: ${({ available }) => (available ? PRIMARY : SPUN_PEARL)};
  cursor: pointer;

  ${({ available }) =>
    !available &&
    css`
      pointer-events: none;
    `}
`;

export const Link = styled.a`
  display: inline-flex;
  color: ${PRIMARY};
`;

export const RowInfo = styled(RowComponent)`
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
