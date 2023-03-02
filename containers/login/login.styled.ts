import styled from 'styled-components';
import { Box } from '@mui/material';

import Typography from '../../components/typography';

export const Background = styled.div`
  align-items: center;
  background: linear-gradient(to right, #181626 19%, #3c356c 72.6%, #d0bae9 180%);
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-top: 80px;
  width: calc(100% - 400px);
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Panel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
  width: 400px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  width: 478px;
`;
