import styled from 'styled-components';

import Typography from '../typography';
import { textTruncate } from '../../utils/theme';

export const App = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 12px;
  height: 194px;
  padding: 24px;
  width: 372px;
`;

export const Categories = styled.div`
  display: flex;
  gap: 8px;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  min-height: 100px;
  margin-top: 8px !important;
  margin-bottom: 16px !important;

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
