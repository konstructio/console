'use client';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';

import { SPUN_PEARL } from '../../constants/colors';

export const InputAdornmentContainer = styled(InputAdornment)`
  position: absolute;
  right: 8px;

  & svg {
    color: ${SPUN_PEARL};
  }
`;
