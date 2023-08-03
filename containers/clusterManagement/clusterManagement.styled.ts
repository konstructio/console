import Link from 'next/link';
import styled from 'styled-components';

import Typography from '../../components/typography';
import Column from '../../components/column';
import Row from '../../components/row';

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ClusterMenuFooter = styled(Row)`
  justify-content: flex-end;
  gap: 16px;
  padding-right: 24px;
  align-items: center;
  height: 88px;
  border-top: 1px solid #e2e8f0;
`;

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

export const FinalFormContainer = styled(Column)`
  gap: 32px;
  padding: 23px;
  flex: 1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
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

export const MenuHeader = styled(Header)`
  padding: 0 24px;
  border-bottom: 1px solid #e2e8f0;
  border-top: none;
`;
