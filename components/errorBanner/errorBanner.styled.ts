import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.sefidWhite};
  border: 1px solid #fee2e2;
  border-radius: 4px;
  min-height: 18px;
  padding: 16px;
  width: calc(100% - 32px);
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;

  & a {
    color: #3f3f3f;
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
`;

export const List = styled.ul`
  padding-left: 28px;
`;

export const ListItem = styled.li``;
