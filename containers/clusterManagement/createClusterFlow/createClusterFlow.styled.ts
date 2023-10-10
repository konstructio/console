'use client';
import styled from 'styled-components';

import Row from '../../../components/row';

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ClusterMenuFooter = styled(Row)<{ reverseButtonOrder?: boolean }>`
  flex-shrink: 0;
  flex-direction: ${({ reverseButtonOrder }) => (reverseButtonOrder ? 'row-reverse' : 'row')};
  justify-content: ${({ reverseButtonOrder }) =>
    reverseButtonOrder ? 'space-between' : 'flex-end'};
  gap: 16px;
  padding: 0 24px;
  align-items: center;
  height: 88px;
  border-top: 1px solid #e2e8f0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MenuHeader = styled(Row)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.volcanicSand};
  height: 70px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 24px;
  border-bottom: 1px solid #e2e8f0;
`;
