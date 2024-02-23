import styled from 'styled-components';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  width: 606px;
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

export const NameSection = styled.div`
  display: flex;
  gap: 24px;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  gap: 24px;
  margin-bottom: 24px;
`;
