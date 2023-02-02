import styled from 'styled-components';
import { InputAdornment } from '@mui/material';

export const Container = styled.div<{ isDisabled?: boolean }>`
  width: 100%;

  & > label {
    margin-bottom: 8px;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    `

      & > label {
        color: #A1A1AA !important;
      }

      & > div > input {
        border-color: #E4E4E7 !important;
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
