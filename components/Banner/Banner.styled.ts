import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

export const Container = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  gap: 16px;
  padding: 15px;
  z-index: 1201;
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  position: fixed;
  top: 25px;
  right: 25px;
`;

export const Text = styled.div`
  max-width: 983px;
`;
