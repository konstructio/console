import NextLink from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.volcanicSand};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Description = styled.div`
  width: 378px;
`;

export const Link = styled(NextLink)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const Title = styled.div`
  margin: 40px 0 16px 0;
  width: 382px;
`;
