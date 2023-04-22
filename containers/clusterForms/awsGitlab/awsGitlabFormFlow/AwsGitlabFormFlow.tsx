import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GitProvider } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { useInstallation } from '../../../../hooks/useInstallation';
import {
  setAWSGitlabInstallState,
  setInstallationStep,
} from '../../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../../components/installationStepContainer/InstallationStepContainer';
import { AwsClusterValues, AwsInstallValues, InstallationType } from '../../../../types/redux';
import ClusterRunningMessage from '../../../../components/clusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../../terminalLogs';
import { AwsReadinessForm } from '../../aws/AwsReadinessForm';
import { AwsGitlabSetupForm } from '../awsGitlabSetupForm/AwsGitlabSetupForm';

import { ContentContainer } from './AwsGitlabFormFlow.styled';

export enum AwsGitlabFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export const AwsGitlabFormFlow: FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedZoneValid, setHostedZoneValid] = useState(false);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedZoneValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  const currentStep = useAppSelector(({ installation }) => installation.installationStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const { stepTitles, installTitles } = useInstallation(InstallationType.AWS, GitProvider.GITLAB);
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
      nextButtonDisabled={!hostedZoneValid}
    >
      <ContentContainer>
        {currentStep === AwsGitlabFormStep.READINESS && (
          <AwsReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={handleTestButtonClick}
            isHostedZoneValid={hostedZoneValid}
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
