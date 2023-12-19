import styled from 'styled-components';

import Column from '@/components/column';

export const Container = styled.div<{ isActive?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 12px;
  height: calc(100% - 48px);
  max-height: 607px;
  padding: 24px;
  width: 225px;

  ${({ isActive, theme }) =>
    isActive &&
    `
    border: 4px solid ${theme.colors.primary};
  `}
`;

export const Features = styled(Column)``;
