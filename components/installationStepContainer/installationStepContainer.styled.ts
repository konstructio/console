import styled from 'styled-components';

import Column from '../column';
import InstallationButtonsComp from '../installationButtons';
import Typography from '../typography';
import { media } from '../../utils/media';

export const Container = styled(Column)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100%;
  width: 100%;
`;

export const InstallationButtons = styled(InstallationButtonsComp)``;

export const Content = styled(Column)<{ hasInfo?: boolean }>`
  align-items: center;
  gap: 24px;
  height: calc(100% - 285px);
  margin: 0 auto;
  overflow-y: auto;
  width: 100%;

  ${({ hasInfo }) =>
    hasInfo &&
    `
      align-items: baseline;
      flex-direction: column;
      justify-content: center;
  `}

  ${media.greaterThan('lg')`
    flex-direction: ${({ hasInfo }) => hasInfo && 'row'};
  `};
`;

export const InstallTitle = styled(Typography)`
  margin: 40px 0 24px 0 !important;
  text-align: center;
`;

export const Title = styled.div`
  margin: 40px auto;
`;
