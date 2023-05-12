import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.sefidWhite};
  border: 1px solid #fee2e2;
  border-radius: 4px;
  min-height: 18px;
  padding: 16px;
  width: calc(100% - 32px);
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
`;
