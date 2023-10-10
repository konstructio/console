'use client';
import Link from 'next/link';
import styled from 'styled-components';

import Typography from '../../components/typography';
import Column from '../../components/column';
import Row from '../../components/row';

export const Container = styled(Column)`
  flex: 1;
  margin: 0 auto;
  width: 100%;
`;

export const Content = styled(Column)`
  flex: 1;
  width: 100%;
`;

export const Description = styled(Typography)`
  color: #3f3f46;
  margin-top: 8px;
`;

export const Header = styled(Row)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  height: 70px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top: 1px solid #e2e8f0;
`;

export const LearnMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;
