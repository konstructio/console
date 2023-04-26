import styled from 'styled-components';

import Column from '../column';
import InstallationButtonsComp from '../installationButtons';
import Row from '../row';
import Typography from '../typography';

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

export const Content = styled(Row)`
  height: 100%;
  margin-bottom: 70px;
  overflow-y: auto;
`;

export const InstallTitle = styled(Typography)`
  margin: 40px auto 24px auto;
`;

export const Title = styled.div`
  margin: 40px auto;
`;

export const LearnMore = styled(Typography)`
  color: ${({ theme }) => theme.colors.spunPearl};
  display: flex;
  gap: 4px;
`;
