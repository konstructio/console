import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import Progress, { ProgressProps } from '../progress/Progress';
import { noop } from '../../utils/noop';
import InstallationButtons, {
  InstallationButtonsProps,
} from '../installationButtons/InstallationButtons';

import { Container, InstallTitle, Content } from './InstallationStepContainer.styled';

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
    <InstallTitle variant="subtitle2">{installationTitle}</InstallTitle>
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
