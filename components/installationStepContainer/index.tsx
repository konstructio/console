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
  FormContent,
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
  onBackButtonClick = noop,
  nextButtonText,
  nextButtonDisabled,
  showNextButton,
  children,
  ...rest
}) => {
  const { completedSteps, isProvisioned } = useAppSelector(({ api }) => ({
    ...api,
  }));
  const progress = useMemo(() => {
    const clusterChecks = Object.keys(CLUSTER_CHECKS);
    const progress = Math.round((completedSteps.length / clusterChecks.length) * 100);

    if (completedSteps.length === clusterChecks.length && !isProvisioned) {
      return 98;
    } else if (isProvisioned) {
      return 100;
    }

    return progress;
  }, [completedSteps.length, isProvisioned]);

  return (
    <Container {...rest}>
      <Progress activeStep={activeStep} steps={steps} />
      <FormContent isProvisionStep={isProvisionStep}>
        {isProvisionStep ? (
          <LinearProgress progress={progress} />
        ) : (
          <InstallTitle variant="subtitle2">{installationTitle}</InstallTitle>
        )}
        <Content hasInfo={hasInfo} isProvisionStep={isProvisionStep}>
          {children}
        </Content>
      </FormContent>
      <InstallationButtons
        onBackButtonClick={onBackButtonClick}
        showBackButton={showBackButton}
        nextButtonText={nextButtonText}
        nextButtonDisabled={nextButtonDisabled}
        showNextButton={showNextButton}
      />
    </Container>
  );
};

export default InstallationStepContainer;
