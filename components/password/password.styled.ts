import styled from 'styled-components';
import { InputAdornment } from '@mui/material';

import { SPUN_PEARL } from '../../constants/colors';

export const InputAdornmentContainer = styled(InputAdornment)`
  position: absolute;
  right: 15px;

  & svg {
    color: ${SPUN_PEARL};
  }
`;
