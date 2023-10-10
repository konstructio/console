'use client';
import styled from 'styled-components';

import Column from '../column';
import NextLinkComp from '../nextLink';
import Row from '../row';

export const Content = styled(Column)`
  gap: 8px;
  margin-left: 38px;
`;

export const CopyTextContainer = styled(Row)`
  flex-wrap: wrap;
  align-items: baseline;
  gap: 3px;
`;

export const Footer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 34px;
`;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

export const NextLink = styled(NextLinkComp)`
  a {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
