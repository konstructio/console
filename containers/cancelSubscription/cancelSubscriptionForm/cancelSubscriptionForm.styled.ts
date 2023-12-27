import styled from 'styled-components';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  width: 582px;
`;

export const SubscriptionOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
  margin-bottom: 24px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 24px;

  & > svg {
    cursor: pointer;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px 24px;
`;

export const Description = styled.div`
  padding: 0 24px;
  margin-bottom: 32px;
`;
