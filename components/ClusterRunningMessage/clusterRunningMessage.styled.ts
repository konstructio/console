import styled from 'styled-components';
import NextLink from 'next/link';

import Column from '../column';

export const Container = styled(Column)`
  align-items: center;
  color: ${({ theme }) => theme.colors.volcanicSand};
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

  strong {
    font-size: 16px;
  }
`;
