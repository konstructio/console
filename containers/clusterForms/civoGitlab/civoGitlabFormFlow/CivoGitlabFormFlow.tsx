import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GitProvider } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { useInstallation } from '../../../../hooks/useInstallation';
import {
  setCivoGithubInstallState,
  setInstallationStep,
} from '../../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../../components/installationStepContainer/InstallationStepContainer';
import {
  CivoClusterValues,
  CivoInstallValues,
  InstallationType,
} from '../../../../types/redux/index';
import ClusterRunningMessage from '../../../../components/clusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../../terminalLogs/index';
import { CivoGitlabReadinessForm } from '../civoGitlabReadinessForm/CivoGitlabReadinessForm';
import { CivoGitlabSetupForm } from '../civoGitlabSetupForm/CivoGitlabSetupForm';

import { ContentContainer } from './CivoGitlabFormFlow.styled';

export enum CivoGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export const CivoGitlabFormFlow: FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);

  const currentStep = useAppSelector(({ installation }) => installation.installationStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedDomainValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const { stepTitles, installTitles } = useInstallation(InstallationType.CIVO, GitProvider.GITLAB);

  const installTitle = installTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

  const handleFormSubmit = useCallback(
    (values: CivoInstallValues | CivoClusterValues) => {
      dispatch(setCivoGithubInstallState(values));
      dispatch(setInstallationStep(currentStep + 1));
    },
    [dispatch, currentStep],
  );

  const handleNextButtonClick = useCallback(() => {
    if (
      (currentStep === CivoGithubFormStep.SETUP || currentStep === CivoGithubFormStep.READINESS) &&
      formRef.current
    ) {
      formRef.current.requestSubmit();
    } else if (!lastStep) {
      dispatch(setInstallationStep(currentStep + 1));
    } else {
      dispatch(setInstallationStep(0));
      router.push('/installations');
    }
  }, [currentStep, lastStep, router, dispatch]);

  const handleBackButtonClick = useCallback(() => {
    if (currentStep === CivoGithubFormStep.READINESS) {
      dispatch(setInstallationStep(0));
      router.back();
    } else {
      dispatch(setInstallationStep(currentStep - 1));
    }
  }, [currentStep, router, dispatch]);

  const nextButtonText = currentStep === CivoGithubFormStep.SETUP ? 'Create cluster' : 'Next';

  return (
    <InstallationStepContainer
      activeStep={currentStep}
      steps={stepTitles}
      installationTitle={installTitle}
      showBackButton
      onNextButtonClick={handleNextButtonClick}
      onBackButtonClick={handleBackButtonClick}
      nextButtonText={nextButtonText}
      nextButtonDisabled={!hostedDomainValid}
    >
      <ContentContainer>
        {currentStep === CivoGithubFormStep.READINESS && (
          <CivoGitlabReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={handleTestButtonClick}
            isHostedDomainValid={hostedDomainValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.SETUP && (
          <CivoGitlabSetupForm onFormSubmit={handleFormSubmit} ref={formRef} />
        )}
        {currentStep === CivoGithubFormStep.PREPARING && <TerminalLogs />}
        {currentStep === CivoGithubFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};
