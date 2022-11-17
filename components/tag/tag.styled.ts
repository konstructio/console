import styled from 'styled-components';

export const Container = styled.div<{
  backgroundColor: string;
  color?: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  color: ${({ color, theme }) => color || theme.colors.black};
  cursor: pointer;
  padding: 5px 10px;
  width: fit-content;

  & a > span {
    color: ${({ color, theme }) => color || theme.colors.black};
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const Link = styled.a`
  color: ${({ color, theme }) => color || theme.colors.black};
  text-decoration: none;
`;
