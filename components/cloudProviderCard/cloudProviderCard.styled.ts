import styled from 'styled-components';
import NextLink from 'next/link';

import Card from '../card';

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  max-width: 540px;
  min-width: 365px;
  padding: 24px;
  height: 84px;
`;

export const DetailsContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: 24px;

  p {
    color: ${({ theme }) => theme.colors.saltboxBlue};
    margin-top: 4px;
  }
`;

export const LabelContainer = styled.div`
  color: ${({ theme }) => theme.colors.volcanicSand};
  display: flex;
  gap: 16px;
`;

export const Link = styled(NextLink)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
