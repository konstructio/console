import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import Progress, { ProgressProps } from '../progress/Progress';
import Typography from '../typography';
import { noop } from '../../utils/noop';
import InstallationButtons, {
  InstallationButtonsProps,
} from '../installationButtons/InstallationButtons';

import { Container, Title, Content } from './InstallationStepContainer.styled';

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
  <Container {...rest}>
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
  </Container>
);

export default styled(InstallationStepContainer)``;
