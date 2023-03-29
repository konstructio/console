import styled from 'styled-components';
import NextImage from 'next/image';
import NextLink from 'next/link';

import Typography from '../typography';
import { textTruncate } from '../../theme/utils';

export const AppConnector = styled.div`
  height: 16px;
  background-color: #e2e8f0;
  top: 8px;
  left: 3px;
  position: absolute;
  width: 2px;
`;

export const LiveAppIcon = styled.div`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  height: 8px;
  position: relative;
  width: 8px;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  height: 194px;
  padding: 24px;
  width: 310px;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  height: 60px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 14px;
  height: 35px;
  margin-bottom: 10px;
`;

export const Image = styled(NextImage)`
  object-fit: contain;
  width: 24px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  font-weight: 600;
`;

export const Link = styled(NextLink)<{ disabled?: boolean }>`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  text-decoration: none;
  gap: 8px;

  & > span {
    overflow: hidden;
    max-width: 400px;
    text-overflow: ellipsis;

    ${textTruncate(1)};
  }

  &:hover {
    text-decoration: underline;
  }

  ${({ disabled }) =>
    disabled &&
    `
      color: #A1A1AA;
      cursor: not-allowed;

      &:hover {
        text-decoration: none;
      }
  `}
`;

export const Links = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  & > span:last-child > a > div > div,
  & > a:last-child > div > div {
    display: none;
  }
`;
