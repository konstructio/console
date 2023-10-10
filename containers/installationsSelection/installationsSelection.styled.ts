'use client';
import styled from 'styled-components';

import { media } from '../../utils/media';
import Column from '../../components/column';
import Row from '../../components/row';
import Typography from '../../components/typography';

export const ContentContainer = styled(Column)`
  align-items: center;
  padding: 0 40px;
  width: calc(100% - 80px);
`;

export const ButtonContainer = styled(Row)`
  justify-content: center;
  gap: 24px;
`;

export const AdventureContent = styled(Column)`
  align-items: center;
  justify-content: center;
`;

export const Subtitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  margin: 40px 0 24px 0 !important;
`;

export const CloudProviderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  ${media.greaterThan('lg')`
    grid-template-columns: 1fr 1fr;
  `}
`;
