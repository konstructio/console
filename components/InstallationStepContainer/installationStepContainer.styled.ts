import styled from 'styled-components';

import Column from '../column';
import InstallationButtonsComp from '../installationButtons';
import Row from '../row';
import Typography from '../typography';
import { media } from '../../utils/media';

export const Container = styled(Column)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100%;
  width: 100%;
`;

export const InstallationButtons = styled(InstallationButtonsComp)`
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 1;
`;

export const Content = styled(Row)<{ hasInfo: boolean }>`
  gap: 24px;
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;

  ${({ hasInfo }) =>
    hasInfo &&
    `
      display: flex;
      flex-direction: column;
  `}

  ${media.greaterThan('lg')`
    flex-direction: ${({ hasInfo }) => hasInfo && 'row'};
  `};
`;

export const InstallTitle = styled(Typography)`
  margin: 40px auto 24px auto;
  text-align: center;
`;

export const Title = styled.div`
  margin: 40px auto;
`;

export const LearnMore = styled(Typography)`
  color: ${({ theme }) => theme.colors.spunPearl};
  display: flex;
  gap: 4px;
`;
