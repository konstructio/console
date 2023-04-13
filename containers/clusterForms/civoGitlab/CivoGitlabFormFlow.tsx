import React, { FC, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Row from '../../../components/Row/Row';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useInstallation } from '../../../hooks/useInstallation';
import {
  setCivoGithubInstallState,
  setInstallationStep,
} from '../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../components/InstallationStepContainer/InstallationStepContainer';
import { CivoClusterValues, CivoInstallValues, InstallationType } from '../../../types/redux/index';
import ClusterRunningMessage from '../../../components/ClusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../terminalLogs/index';

import CivoGitlabReadinessForm, {
  CivoGitlabReadinessFormProps,
} from './CivoGitlabReadinessForm/CivoGitlabReadinessForm';
import CivoGitlabSetupForm, {
  CivoGitlabSetupFormProps,
} from './CivoGitlabSetupForm/CivoGitlabSetupForm';

export enum CivoGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export interface CivoGitlabFormFlowProps
  extends Omit<CivoGitlabReadinessFormProps, 'onFormSubmit'>,
    Omit<CivoGitlabSetupFormProps, 'onFormSubmit'> {}

export const CivoGitlabFormFlow: FC<CivoGitlabFormFlowProps> = ({
  showMessage,
  isValidating,
  onTestButtonClick,
  isHostedDomainValid,
  loading,
}) => {
  const currentStep = useAppSelector(({ installation }) => installation.installationStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const { stepTitles, installTitles } = useInstallation(InstallationType.CIVO_GITLAB);

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
      nextButtonDisabled={!isHostedDomainValid}
    >
      <ContentContainer>
        {currentStep === CivoGithubFormStep.READINESS && (
          <CivoGitlabReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={onTestButtonClick}
            isHostedDomainValid={isHostedDomainValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.SETUP && (
          <CivoGitlabSetupForm loading={loading} onFormSubmit={handleFormSubmit} ref={formRef} />
        )}
        {currentStep === CivoGithubFormStep.PREPARING && <TerminalLogs />}
        {currentStep === CivoGithubFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};

const ContentContainer = styled(Row)`
  justify-content: center;
  flex: 1;
  padding: 0 80px;
`;
