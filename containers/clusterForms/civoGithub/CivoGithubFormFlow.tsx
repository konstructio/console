import React, { FC, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useInstallation } from '../../../hooks/useInstallation';
import {
  setCivoGithubInstallState,
  setInstallationStep,
} from '../../../redux/slices/installation.slice';
import InstallationStepContainer from '../../../components/InstallationStepContainer/InstallationStepContainer';
import {
  CivoGithubClusterValues,
  CivoInstallValues,
  InstallationType,
} from '../../../types/redux/index';
import ClusterRunningMessage from '../../../components/ClusterRunningMessage/ClusterRunningMessage';
import TerminalLogs from '../../terminalLogs/index';
import Row from '../../../components/Row/Row';

import CivoGithubReadinessForm, {
  CivoGithubReadinessFormProps,
} from './CivoGithubReadinessForm/CivoGithubReadinessForm';
import CivoGithubSetupForm, {
  CivoGithubSetupFormProps,
} from './CivoGithubSetupForm/CivoGithubSetupForm';

export enum CivoGithubFormStep {
  SELECTION,
  READINESS,
  SETUP,
  PREPARING,
  READY,
}

export interface CivoGithubFormFlowProps
  extends Omit<CivoGithubReadinessFormProps, 'onFormSubmit'>,
    Omit<CivoGithubSetupFormProps, 'onFormSubmit'> {}

export const CivoGithubFormFlow: FC<CivoGithubFormFlowProps> = ({
  showMessage,
  isValidating,
  onTestButtonClick,
  isHostedDomainValid,
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

  const { stepTitles } = useInstallation(InstallationType.CIVO_GITHUB);
  const stepTitle = stepTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

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
      nextButtonDisabled={!isHostedDomainValid}
    >
      <ContentContainer>
        {currentStep === CivoGithubFormStep.READINESS && (
          <CivoGithubReadinessForm
            showMessage={showMessage}
            isValidating={isValidating}
            onTestButtonClick={onTestButtonClick}
            isHostedDomainValid={isHostedDomainValid}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.SETUP && (
          <CivoGithubSetupForm
            hasTokenValue={hasTokenValue}
            githubTokenValid={githubTokenValid}
            githubUserOrginizations={githubUserOrginizations}
            onGithubTokenBlur={onGithubTokenBlur}
            loading={loading}
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

const ContentContainer = styled(Row)`
  justify-content: center;
  flex: 1;
  padding: 0 80px;
`;
