import styled from 'styled-components';

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

export const Body = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.americanBlue};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 6px 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export const Container = styled.div`
  max-height: 250px;
  padding: 30px;
`;

export const Code = styled.span`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  border-radius: 4px;
  font-size: 16px;
  font-family: monospace;
  margin: 0 10px;
  max-width: 260px;
  overflow: auto;
  padding: 5px;
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
`;

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 20px;

  & ul {
    margin: 0;
    padding: 0;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  height: 40px;
  margin-right: 15px;
`;

export const Links = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const List = styled.li`
  list-style: none;
`;

export const Row = styled.div<{ shouldShowHoverState?: boolean }>`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  width: 100%;
`;
