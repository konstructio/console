import { styled as muiStyled } from '@mui/material';
import styled, { css } from 'styled-components';

import Row from '../Row/Row';

import Tooltip from '@/components/Tooltip/Tooltip';
import Typography from '@/components/Typography/Typography';
import { MIDNIGHT_EXPRESS } from '@/constants/colors';
import { media } from '@/utils/media';

export const BreakpointTooltip = muiStyled(Tooltip)(() => ({
  '@media (min-width: 1024px)': {
    display: 'none',
  },
}));

export const MenuItem = styled(Row)<{ isActive?: boolean }>`
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #9ea2c6;
  cursor: pointer;
  gap: 18px;
  height: 24px;
  margin: 0 8px;
  padding: 10px;
  width: 40px;
  transition: width 0.5s ease;

  &:hover {
    background-color: ${MIDNIGHT_EXPRESS};
    color: white;

    svg {
      color: white;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${MIDNIGHT_EXPRESS};
      color: white;

      svg {
        color: white;
      }
    `}

  ${media.greaterThan('md')`
    padding: 12px 18px;
    width: 204px;
    justify-content: flex-start;
  `}
`;

export const Title = styled(Typography)`
  display: none;

  ${media.greaterThan('md')`
      display: block;
  `}
`;
