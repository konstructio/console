import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { useInstallation } from '../../../../hooks/useInstallation';
import {
  setCivoGithubInstallState,
  setInstallationStep,
} from '../../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../../components/installationStepContainer/InstallationStepContainer';
import {
  CivoGithubClusterValues,
  CivoInstallValues,
  InstallationType,
} from '../../../../types/redux/index';
import ClusterRunningMessage from '../../../../components/clusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../../terminalLogs/index';
import { getGithubUser, getGithubUserOrganizations } from '../../../../redux/thunks/git.thunk';
import { CivoGithubReadinessForm } from '../civoGithubReadinessForm/CivoGithubReadinessForm';
import { CivoGithubSetupForm } from '../civoGithubSetupForm/CivoGithubSetupForm';

import { ContentContainer } from './CivoGithubFormFlow.styled';

export enum CivoGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export const CivoGithubFormFlow: FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);
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

  const { stepTitles } = useInstallation(InstallationType.CIVO_GITHUB);
  const stepTitle = stepTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedDomainValid(true);
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

  const handleFormSubmit = useCallback(
    (values: CivoInstallValues | CivoGithubClusterValues) => {
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
      installationTitle={stepTitle}
      showBackButton
      onNextButtonClick={handleNextButtonClick}
      onBackButtonClick={handleBackButtonClick}
      nextButtonText={nextButtonText}
      nextButtonDisabled={!hostedDomainValid}
    >
      <ContentContainer>
        {currentStep === CivoGithubFormStep.READINESS && (
          <CivoGithubReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={handleTestButtonClick}
            isHostedDomainValid={hostedDomainValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.SETUP && (
          <CivoGithubSetupForm
            hasTokenValue={!!githubToken}
            githubTokenValid={!!githubUser}
            githubUserOrginizations={githubUserOrganizations}
            onGithubTokenBlur={handleGithubTokenBlur}
            loading={gitStateLoading}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.PREPARING && <TerminalLogs />}
        {currentStep === CivoGithubFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};
