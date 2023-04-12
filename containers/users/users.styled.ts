import Link from 'next/link';
import styled from 'styled-components';

import Typography from '../../components/typography';

export const Container = styled.div`
  min-width: 1104px;
  margin: 0 auto;
  padding: 40px 0;
`;

export const Content = styled.div`
  margin-top: 32px;
`;

export const Description = styled(Typography)`
  color: #3f3f46;
  margin-top: 8px;
`;

export const Header = styled.div``;

export const LearnMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;
