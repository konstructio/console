import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material';
import styled, { css } from 'styled-components';

import { DOLPHIN, FIRE_BRICK, MAGNOLIA, ROYAL_PURPLE } from '../../constants/colors';

export interface IButtonProps extends ButtonProps {
  color: 'primary' | 'secondary' | 'error';
  variant: Required<ButtonProps['variant']>;
}

export default styled(Button)<IButtonProps>`
  box-shadow: none;
  border: ${({ color }) => color === 'secondary' && `1px solid inherit !important`};
  background-color: ${({ color, theme }) => color === 'error' && theme.colors.danger};

  &.Mui-disabled {
    pointer-events: unset !important;
    cursor: not-allowed !important;
  }

  &:hover {
    background-color: ${({ color }) =>
      color === 'primary'
        ? `${ROYAL_PURPLE}`
        : color === 'secondary'
        ? `${MAGNOLIA}`
        : color === 'error'
        ? `${FIRE_BRICK}`
        : 'inherit'}};
  }

  ${({ color, disabled, theme }) => {
    if (disabled && color === 'primary') {
      return css`
        background-color: ${theme.colors.lightGrey} !important;
        color: ${DOLPHIN} !important;
      `;
    }
    if (disabled && color === 'secondary') {
      return css`
        border-color: ${DOLPHIN} !important;
        color: ${DOLPHIN} !important;
      `;
    }
  }}
`;
