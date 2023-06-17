import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 24px;
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  position: fixed;
  top: 25px;
  right: 25px;
`;

export const Footer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  padding: 16px 24px;
  width: calc(100% - 48px);
`;

export const Header = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  position: relative;
  text-transform: capitalize;
`;
