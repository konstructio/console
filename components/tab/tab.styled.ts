import styled from 'styled-components';
import { Box } from '@mui/material';

export const TabContainer = styled(Box)<{ backgroundColor?: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  margin-top: 32px;
  height: calc(100% - 122px);
  width: 100%;
`;
