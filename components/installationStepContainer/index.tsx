import React, { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import Progress, { ProgressProps } from '../progress';
import { noop } from '../../utils/noop';
import { InstallationButtonsProps } from '../installationButtons';
import LinearProgress from '../linearProgress';
import { useAppSelector } from '../../redux/store';
import { CLUSTER_CHECKS } from '../../constants/cluster';

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
  isProvisionStep: boolean;
}

const InstallationStepContainer: FunctionComponent<InstallationStepContainerProps> = ({
  activeStep,
  steps,
  hasInfo,
  installationTitle,
  isProvisionStep,
  showBackButton,
  onNextButtonClick,
  onBackButtonClick = noop,
  nextButtonText,
  nextButtonDisabled,
  children,
  ...rest
}) => {
  const { completedSteps } = useAppSelector(({ cluster }) => ({
    ...cluster,
  }));
  const progress = useMemo(
    () => Math.round((completedSteps.length / Object.keys(CLUSTER_CHECKS).length) * 100),
    [completedSteps.length],
  );

  return (
    <Container {...rest}>
      <Progress activeStep={activeStep} steps={steps} />
      {isProvisionStep ? (
        <LinearProgress progress={progress} />
      ) : (
        <InstallTitle variant="subtitle2">{installationTitle}</InstallTitle>
      )}
      <Content hasInfo={hasInfo} isProvisionStep={isProvisionStep}>
        {children}
      </Content>
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
};

export default InstallationStepContainer;
