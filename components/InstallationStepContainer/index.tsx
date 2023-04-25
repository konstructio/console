import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Divider } from '@mui/material';

import Progress, { ProgressProps } from '../progress';
import { noop } from '../../utils/noop';
import NextLink from '../nextLink';
import { InstallationButtonsProps } from '../installationButtons';

import {
  Container,
  InstallationButtons,
  InstallTitle,
  Content,
  LearnMore,
} from './installationStepContainer.styled';

interface InstallationStepContainerProps
  extends PropsWithChildren,
    ProgressProps,
    InstallationButtonsProps {
  installationTitle: string;
}

const InstallationStepContainer: FunctionComponent<InstallationStepContainerProps> = ({
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
    <Content>
      {children}
      {/* <Divider />
      <LearnMore variant="labelLarge">
        Learn more about <NextLink href="docs.kubefirst.io">configuring your cluster</NextLink>
      </LearnMore> */}
    </Content>
    <InstallationButtons
      onNextButtonClick={onNextButtonClick}
      onBackButtonClick={onBackButtonClick}
      showBackButton={showBackButton}
      nextButtonText={nextButtonText}
      nextButtonDisabled={nextButtonDisabled}
    />
  </Container>
);

export default InstallationStepContainer;
