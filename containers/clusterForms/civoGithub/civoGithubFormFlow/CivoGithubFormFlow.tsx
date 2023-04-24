import React, { FunctionComponent, useRef, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWebSocket } from 'hooks/useWebSocket';

import { GitProvider } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { useInstallation } from '../../../../hooks/useInstallation';
import {
  setCivoGithubInstallState,
  setInstallationStep,
} from '../../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../../components/installationStepContainer';
import {
  CivoGithubClusterValues,
  CivoInstallValues,
  InstallationType,
} from '../../../../types/redux/index';
import ClusterRunningMessage from '../../../../components/clusterRunningMessage';
import { getGithubUser, getGithubUserOrganizations } from '../../../../redux/thunks/git.thunk';
import { CivoGithubReadinessForm } from '../CivoGithubReadinessForm/CivoGithubReadinessForm';
import { CivoGithubSetupForm } from '../CivoGithubSetupForm/CivoGithubSetupForm';
import TerminalLogs from '../../../terminalLogs';

import { ContentContainer } from './CivoGithubFormFlow.styled';

export enum CivoGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export const CivoGithubFormFlow: FunctionComponent = () => {
  const [githubToken, setGithubToken] = useState('');
  const socket = useWebSocket('ws://localhost:8081/api/v1/stream');

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

  const { stepTitles } = useInstallation(InstallationType.CIVO, GitProvider.GITHUB);
  const stepTitle = stepTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

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

  const handleFormSubmit = useCallback(
    async (values: CivoInstallValues | CivoGithubClusterValues) => {
      if (currentStep === CivoGithubFormStep.READINESS && values.githubToken) {
        try {
          await dispatch(getGithubUserOrganizations(values.githubToken));
          dispatch(setInstallationStep(currentStep + 1));
          dispatch(setCivoGithubInstallState(values));
        } catch (error) {
          // processed in redux
        }
      } else {
        dispatch(setInstallationStep(currentStep + 1));
        dispatch(setCivoGithubInstallState(values));
      }
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

  useEffect(() => {
    dispatch(setInstallationStep(3));
  }, [dispatch]);

  return (
    <InstallationStepContainer
      activeStep={currentStep}
      steps={stepTitles}
      installationTitle={stepTitle}
      showBackButton
      onNextButtonClick={handleNextButtonClick}
      onBackButtonClick={handleBackButtonClick}
      nextButtonText={nextButtonText}
    >
      <ContentContainer>
        {currentStep === CivoGithubFormStep.READINESS && (
          <CivoGithubReadinessForm onFormSubmit={handleFormSubmit} ref={formRef} />
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
        {currentStep === CivoGithubFormStep.PREPARING && socket && <TerminalLogs socket={socket} />}
        {currentStep === CivoGithubFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};
