import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 64px);
  margin: 0 auto;
  overflow: auto;
  padding: 40px 0 0 40px;
  width: calc(100% - 40px);
`;

export const Content = styled.div``;

export const Header = styled.div`
  color: ${({ theme }) => theme.colors.volcanicSand};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const LearnMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const ServicesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  max-height: calc(100% - 50px);
`;
