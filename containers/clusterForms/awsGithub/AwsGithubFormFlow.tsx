import React, { FC, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useInstallation } from '../../../hooks/useInstallation';
import {
  setAWSGithubInstallState,
  setInstallationStep,
} from '../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../components/InstallationStepContainer/InstallationStepContainer';
import { AwsGithubClusterValues, InstallationType } from '../../../types/redux';
import ClusterRunningMessage from '../../../components/ClusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../terminalLogs';
import AwsReadinessForm, {
  AwsReadinessFormProps,
} from '../../../components/AwsReadinessForm/AwsReadinessForm';
import Row from '../../../components/Row/Row';

import AwsGithubSetupForm, {
  AwsGithubSetupFormProps,
} from './AwsGithubSetupForm/AwsGithubSetupForm';

export enum AwsGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export interface AwsGithubFormFlowProps
  extends Omit<AwsReadinessFormProps, 'onFormSubmit'>,
    Omit<AwsGithubSetupFormProps, 'onFormSubmit'> {}

export const AwsGithubFormFlow: FC<AwsGithubFormFlowProps> = ({
  showMessage,
  isValidating,
  onTestButtonClick,
  isHostedZoneValid,
  hasTokenValue,
  githubTokenValid,
  githubUserOrginizations,
  onGithubTokenBlur,
  loading,
}) => {
  const currentStep = useAppSelector(({ installation }) => installation.installationStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const { stepTitles, installTitles } = useInstallation(InstallationType.AWS_GITHUB);
  const installTitle = installTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

  const handleFormSubmit = useCallback(
    (values: AwsGithubClusterValues) => {
      dispatch(setAWSGithubInstallState(values));
      dispatch(setInstallationStep(currentStep + 1));
    },
    [dispatch, currentStep],
  );

  const handleNextButtonClick = useCallback(() => {
    if (
      (currentStep === AwsGithubFormStep.SETUP || currentStep === AwsGithubFormStep.READINESS) &&
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
    if (currentStep === AwsGithubFormStep.READINESS) {
      dispatch(setInstallationStep(0));
      router.back();
    } else {
      dispatch(setInstallationStep(currentStep - 1));
    }
  }, [router, dispatch, currentStep]);

  const nextButtonText = currentStep === AwsGithubFormStep.SETUP ? 'Create cluster' : 'Next';

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
        {currentStep === AwsGithubFormStep.READINESS && (
          <AwsReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={onTestButtonClick}
            isHostedZoneValid={isHostedZoneValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === AwsGithubFormStep.SETUP && (
          <AwsGithubSetupForm
            hasTokenValue={hasTokenValue}
            githubTokenValid={githubTokenValid}
            githubUserOrginizations={githubUserOrginizations}
            onGithubTokenBlur={onGithubTokenBlur}
            loading={loading}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === AwsGithubFormStep.PREPARING && <TerminalLogs />}
        {currentStep === AwsGithubFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};

const ContentContainer = styled(Row)`
  justify-content: center;
  flex: 1;
  padding: 0 80px;
`;
