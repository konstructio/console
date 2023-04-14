import styled from 'styled-components';

import Column from '../column/Column';
import InstallationButtons from '../installationButtons/InstallationButtons';
import Row from '../row/Row';

export const Container = styled(Column)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.washMe};

  ${InstallationButtons} {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`;

export const Title = styled.div`
  margin: 40px auto;
`;

export const Content = styled(Row)`
  height: 100%;
  margin-bottom: 70px;
  overflow-y: auto;
`;
