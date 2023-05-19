import styled from 'styled-components';

import Typography from '../../components/typography';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 12px;
  height: 194px;
  padding: 24px;
  width: 372px;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  height: 100px;
  margin: 16px 0;

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
  gap: 16px;
`;
