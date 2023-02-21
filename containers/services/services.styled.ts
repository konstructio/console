import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 80px);
  overflow: auto;
  margin: 0 auto;
  padding: 40px;
  max-width: 1192px;
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.colors.volcanicSand};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
`;

export const LearnMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const ServicesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const MetaphorAppsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;

export const MetaphorColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-right: 10px;
  margin-top: 6px;
`;

export const MetaphorColumnUrls = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AppIcon = styled.div`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  height: 8px;
  position: relative;
  width: 8px;

  &:last-child > div {
    display: none;
  }
`;

export const AppConnector = styled.div`
  height: 16px;
  background-color: #e2e8f0;
  top: 8px;
  left: 3px;
  position: absolute;
  width: 2px;
`;

export const AppUrl = styled.div`
  position: relative;
`;
