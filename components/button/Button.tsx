import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material';
import styled, { css } from 'styled-components';

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
        ? '#6f37ae'
        : color === 'secondary'
        ? '#faf5ff'
        : color === 'error'
        ? '#b91c1c'
        : 'inherit'}};
  }

  ${({ color, disabled }) => {
    if (disabled && color === 'primary') {
      return css`
        background-color: #e4e4e7 !important;
        color: #71717a !important;
      `;
    }
    if (disabled && color === 'secondary') {
      return css`
        border-color: #71717a !important;
        color: #71717a !important;
      `;
    }
  }}
`;
