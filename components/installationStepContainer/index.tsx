import React, { FunctionComponent, PropsWithChildren } from 'react';

import Progress, { ProgressProps } from '../progress';
import { noop } from '../../utils/noop';
import { InstallationButtonsProps } from '../installationButtons';

import {
  Container,
  InstallationButtons,
  InstallTitle,
  Content,
} from './installationStepContainer.styled';

interface InstallationStepContainerProps
  extends PropsWithChildren,
    ProgressProps,
    InstallationButtonsProps {
  hasInfo?: boolean;
  installationTitle: string;
}

const InstallationStepContainer: FunctionComponent<InstallationStepContainerProps> = ({
  activeStep,
  steps,
  hasInfo,
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
    <InstallTitle variant="subtitle2">{installationTitle}</InstallTitle>
    <Content hasInfo={hasInfo}>{children}</Content>
    <InstallationButtons
      activeStep={activeStep}
      onNextButtonClick={onNextButtonClick}
      onBackButtonClick={onBackButtonClick}
      showBackButton={showBackButton}
      nextButtonText={nextButtonText}
      nextButtonDisabled={nextButtonDisabled}
    />
  </Container>
);

export default InstallationStepContainer;
