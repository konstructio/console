import InputAdornment from '@mui/material/InputAdornment';
import FormHelperTextMui from '@mui/material/FormHelperText';

import { SPUN_PEARL, TRAFFIC_WHITE } from '../../constants/colors';

import styled, { css } from '@/app/lib/styled-components';

export const Container = styled.div.withConfig<{ isDisabled?: boolean }>({
  shouldForwardProp: (prop) => prop !== 'isDisabled',
})<{ isDisabled?: boolean }>`
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
        background-color: ${TRAFFIC_WHITE};
        cursor: not-allowed;
      }
    `}
`;

export const Required = styled.div`
  color: ${({ theme }) => theme.colors.danger};
`;

export const InputAdornmentContainer = styled(InputAdornment)`
  position: absolute;
  right: 15px;
`;

export const StartAdornmentContainer = styled(InputAdornment)`
  position: absolute;
  left: 15px;
`;

export const FormHelperText = styled(FormHelperTextMui)`
  & a {
    color: ${({ theme }) => theme.colors.exclusivePlum};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;
