import styled from 'styled-components';

import Column from '@/components/Column/Column';
import Row from '@/components/Row/Row';

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100vh;
  width: 100vw;
`;

export const Content = styled(Column)`
  flex: 1;
  min-width: 0px;
`;

export const Link = styled.a`
  cursor: pointer;
  color: white;
  text-decoration: underline;
`;
