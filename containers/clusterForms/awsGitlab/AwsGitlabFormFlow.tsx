import React, { FC, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useInstallation } from '../../../hooks/useInstallation';
import {
  setAWSGitlabInstallState,
  setInstallationStep,
} from '../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../components/InstallationStepContainer/InstallationStepContainer';
import { AwsClusterValues, AwsInstallValues, InstallationType } from '../../../types/redux';
import ClusterRunningMessage from '../../../components/ClusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../terminalLogs';
import AwsReadinessForm, {
  AwsReadinessFormProps,
} from '../../../components/AwsReadinessForm/AwsReadinessForm';
import Row from '../../../components/Row/Row';

import AwsGitlabSetupForm, {
  AwsGitlabSetupFormProps,
} from './AwsGitlabSetupForm/AwsGitlabSetupForm';

export enum AwsGitlabFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export interface AwsGitlabFormFlowProps
  extends Omit<AwsReadinessFormProps, 'onFormSubmit'>,
    Omit<AwsGitlabSetupFormProps, 'onFormSubmit'> {}

export const AwsGitlabFormFlow: FC<AwsGitlabFormFlowProps> = ({
  showMessage,
  isValidating,
  onTestButtonClick,
  isHostedZoneValid,
}) => {
  const currentStep = useAppSelector(({ installation }) => installation.installationStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const { stepTitles, installTitles } = useInstallation(InstallationType.AWS_GITLAB);
  const installTitle = installTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

  const handleFormSubmit = useCallback(
    (values: AwsInstallValues | AwsClusterValues) => {
      dispatch(setAWSGitlabInstallState(values));
      dispatch(setInstallationStep(currentStep + 1));
    },
    [dispatch, currentStep],
  );

  const handleNextButtonClick = useCallback(() => {
    if (
      (currentStep === AwsGitlabFormStep.SETUP || currentStep === AwsGitlabFormStep.READINESS) &&
      formRef.current
    ) {
      formRef.current.requestSubmit();
    } else if (!lastStep) {
      dispatch(setInstallationStep(currentStep + 1));
    } else {
      dispatch(setInstallationStep(0));
      router.push('/installations');
    }
  }, [dispatch, lastStep, currentStep, router]);

  const handleBackButtonClick = useCallback(() => {
    if (currentStep === AwsGitlabFormStep.READINESS) {
      router.back();
      dispatch(setInstallationStep(0));
    } else {
      dispatch(setInstallationStep(currentStep - 1));
    }
  }, [currentStep, router, dispatch]);

  const nextButtonText = currentStep === AwsGitlabFormStep.SETUP ? 'Create cluster' : 'Next';

  return (
    <InstallationStepContainer
      activeStep={currentStep}
      steps={stepTitles}
      installationTitle={installTitle}
      showBackButton
      onNextButtonClick={handleNextButtonClick}
      onBackButtonClick={handleBackButtonClick}
      nextButtonText={nextButtonText}
      nextButtonDisabled={!isHostedZoneValid}
    >
      <ContentContainer>
        {currentStep === AwsGitlabFormStep.READINESS && (
          <AwsReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={onTestButtonClick}
            isHostedZoneValid={isHostedZoneValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === AwsGitlabFormStep.SETUP && (
          <AwsGitlabSetupForm onFormSubmit={handleFormSubmit} ref={formRef} />
        )}
        {currentStep === AwsGitlabFormStep.PREPARING && <TerminalLogs />}
        {currentStep === AwsGitlabFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};

const ContentContainer = styled(Row)`
  justify-content: center;
  flex: 1;
  padding: 0 80px;
`;
