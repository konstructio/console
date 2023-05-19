import styled from 'styled-components';
import { Box } from '@mui/material';

export const TabContainer = styled(Box)<{ backgroundColor?: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  height: 100%;
  width: 100%;
`;
