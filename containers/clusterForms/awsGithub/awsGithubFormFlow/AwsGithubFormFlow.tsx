import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GitProvider } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { useInstallation } from '../../../../hooks/useInstallation';
import {
  setAWSGithubInstallState,
  setInstallationStep,
} from '../../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../../components/installationStepContainer/InstallationStepContainer';
import { AwsGithubClusterValues, InstallationType } from '../../../../types/redux';
import ClusterRunningMessage from '../../../../components/clusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../../terminalLogs';
import { AwsReadinessForm } from '../../aws/AwsReadinessForm';
import { getGithubUser, getGithubUserOrganizations } from '../../../../redux/thunks/git.thunk';
import { AwsGithubSetupForm } from '../awsGithubSetupForm/AwsGithubSetupForm';

import { ContentContainer } from './AwsGithubFormFlow.styled';

export enum AwsGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export const AwsGithubFormFlow: FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedZoneValid, setHostedZoneValid] = useState(false);
  const [githubToken, setGithubToken] = useState('');

  const { currentStep, githubUser, githubUserOrganizations, gitStateLoading } = useAppSelector(
    ({ installation, git }) => ({
      currentStep: installation.installationStep,
      gitStateLoading: git.isLoading,
      ...git,
    }),
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedZoneValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleGithubTokenBlur = useCallback(
    async (token: string) => {
      setGithubToken(token);
      try {
        await dispatch(getGithubUser(token)).unwrap();
        await dispatch(getGithubUserOrganizations(token)).unwrap();
      } catch (error) {
        // error processed in redux state
      }
    },
    [dispatch],
  );

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  const { stepTitles, installTitles } = useInstallation(InstallationType.AWS, GitProvider.GITHUB);

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
      nextButtonDisabled={!hostedZoneValid}
    >
      <ContentContainer>
        {currentStep === AwsGithubFormStep.READINESS && (
          <AwsReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={handleTestButtonClick}
            isHostedZoneValid={hostedZoneValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === AwsGithubFormStep.SETUP && (
          <AwsGithubSetupForm
            hasTokenValue={!!githubToken}
            githubTokenValid={!!githubUser}
            githubUserOrginizations={githubUserOrganizations}
            onGithubTokenBlur={handleGithubTokenBlur}
            loading={gitStateLoading}
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
