import styled from 'styled-components';
import { Box } from '@mui/material';

export default styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1);
`;
