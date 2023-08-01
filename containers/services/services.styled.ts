import Link from 'next/link';
import styled from 'styled-components';

import Row from '../../components/row';
import Column from '../../components/column';

export const ClusterMenu = styled(Column)`
  border-left: 1px solid #e2e8f0;
  height: 100%;
  width: 684px;
  transition: all 0.4s ease;
  background-color: white;
  position: absolute;
  display: none;
  top: 0;
  right: 0;
  z-index: 1;

  &.cluster-menu-enter-done,
  &.cluster-menu-exit {
    display: flex;
    transform: translateX(0px);
  }
  &.cluster-menu-enter-active,
  &.cluster-menu-exit-active {
    display: flex;
    transform: translateX(684px);
  }
`;

export const ClusterMenuFooter = styled(Row)`
  justify-content: flex-end;
  gap: 16px;
  padding-right: 24px;
  align-items: center;
  height: 88px;
  border-top: 1px solid #e2e8f0;
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Container = styled(Column)`
  flex: 1;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
`;

export const Content = styled(Column)`
  flex: 1;
  width: 100%;
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
`;

export const ServicesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;
