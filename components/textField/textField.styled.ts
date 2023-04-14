import styled, { css } from 'styled-components';
import { InputAdornment } from '@mui/material';

import { SPUN_PEARL } from '../../constants/colors';

export const Container = styled.div<{ isDisabled?: boolean }>`
  width: 100%;

  & > label {
    margin-bottom: 8px;
  }

  ${({ isDisabled, theme }) =>
    isDisabled &&
    css`
      & > label {
        color: ${SPUN_PEARL} !important;
      }

      & > div > input {
        border-color: ${theme.colors.lightGrey} !important;
        cursor: not-allowed;
      }
    `}
`;

export const Required = styled.div`
  color: ${({ theme }) => theme.colors.danger};
`;

export const InputAdornmentError = styled(InputAdornment)`
  position: absolute;
  right: 15px;
`;
