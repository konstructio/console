'use client';
import styled from 'styled-components';

import Typography from '../typography';
import { textTruncate } from '../../utils/theme';
import { CHEFS_HAT, DR_WHITE } from '../../constants/colors';

export const App = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  justify-content: space-between;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 12px;
  height: 194px;
  padding: 24px;
  width: 372px;
`;

export const Category = styled.div`
  display: flex;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  margin-top: 8px !important;
  margin-bottom: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;

  ${textTruncate(3)};

  & a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const Installing = styled.div`
  background-color: ${DR_WHITE};
  border: 1px solid ${CHEFS_HAT};
  display: flex;
  gap: 16px;
  height: 40px;
  padding: 16px;
  width: calc(100% - 32px);
`;
