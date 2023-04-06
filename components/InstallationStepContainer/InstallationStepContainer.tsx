import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import Row from '../Row/Row';
import Column from '../Column/Column';
import Progress, { ProgressProps } from '../progress';
import Typography from '../typography';
import { noop } from '../../utils/noop';
import InstallationButtons, {
  InstallationButtonsProps,
} from '../InstallationButtons/InstallationButtons';

interface InstallationStepContainerProps
  extends PropsWithChildren,
    ProgressProps,
    InstallationButtonsProps {
  installationTitle: string;
}

const InstallationStepContainer: FC<InstallationStepContainerProps> = ({
  activeStep,
  steps,
  installationTitle,
  showBackButton,
  onNextButtonClick,
  onBackButtonClick = noop,
  nextButtonText,
  nextButtonDisabled,
  children,
  ...rest
}) => (
  <Column {...rest}>
    <Progress activeStep={activeStep} steps={steps} />
    <Title>
      <Typography variant="h6">{installationTitle}</Typography>
    </Title>
    <Content>{children}</Content>
    <InstallationButtons
      onNextButtonClick={onNextButtonClick}
      onBackButtonClick={onBackButtonClick}
      showBackButton={showBackButton}
      nextButtonText={nextButtonText}
      nextButtonDisabled={nextButtonDisabled}
    />
  </Column>
);

export default styled(InstallationStepContainer)`
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

const Title = styled.div`
  margin: 40px auto;
`;

const Content = styled(Row)`
  height: 100%;
  margin-bottom: 70px;
  overflow-y: auto;
`;
