'use client';
import styled from 'styled-components';
import Box from '@mui/material/Box';

export default styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1);
`;
