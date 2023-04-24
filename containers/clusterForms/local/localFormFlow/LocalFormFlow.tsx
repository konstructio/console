import React, { FunctionComponent, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import { InstallationType, LocalInstallValues } from '../../../../types/redux';
import { useInstallation } from '../../../../hooks/useInstallation';
import {
  setLocalInstallState,
  setInstallationStep,
} from '../../../../redux/slices/installation.slice';
import ClusterRunningMessage from '../../../../components/clusterRunningMessage';
import TerminalLogs from '../../../terminalLogs';
import InstallationStepContainer from '../../../../components/installationStepContainer';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { LocalSetupForm } from '../LocalSetupForm/LocalSetupForm';
import { GitProvider } from '../../../../types';

import { ContentContainer } from './LocalFormFlow.styled';

export enum LocalFormStep {
  SELECTION,
  SETUP,
  PREPARING,
  READY,
}

export const LocalFormFlow: FunctionComponent = () => {
  const currentStep = useAppSelector(({ installation }) => installation.installationStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const { stepTitles, installTitles } = useInstallation(InstallationType.LOCAL, GitProvider.GITHUB);

  const installTitle = installTitles[currentStep];

  const lastStep = currentStep === stepTitles.length - 1;

  const handleFormSubmit = useCallback(
    (values: LocalInstallValues) => {
      dispatch(setLocalInstallState(values));
      dispatch(setInstallationStep(currentStep + 1));
    },
    [dispatch, currentStep],
  );

  const handleNextButtonClick = useCallback(() => {
    if (currentStep === LocalFormStep.SETUP && formRef.current) {
      formRef.current.requestSubmit();
    } else if (!lastStep) {
      dispatch(setInstallationStep(currentStep + 1));
    } else {
      dispatch(setInstallationStep(0));
      router.push('/installations');
    }
  }, [dispatch, lastStep, currentStep, router]);

  const handleBackButtonClick = useCallback(() => {
    if (currentStep === LocalFormStep.SETUP) {
      dispatch(setInstallationStep(0));
      router.back();
    } else {
      dispatch(setInstallationStep(currentStep - 1));
    }
  }, [dispatch, currentStep, router]);

  const nextButtonText = currentStep === LocalFormStep.SETUP ? 'Create cluster' : 'Next';

  return (
    <InstallationStepContainer
      activeStep={currentStep}
      steps={stepTitles}
      installationTitle={installTitle}
      showBackButton
      onNextButtonClick={handleNextButtonClick}
      onBackButtonClick={handleBackButtonClick}
      nextButtonText={nextButtonText}
    >
      <ContentContainer>
        {currentStep === LocalFormStep.SETUP && (
          <LocalSetupForm ref={formRef} onFormSubmit={handleFormSubmit} />
        )}
        {currentStep === LocalFormStep.PREPARING && <TerminalLogs />}
        {currentStep === LocalFormStep.READY && <ClusterRunningMessage />}
      </ContentContainer>
    </InstallationStepContainer>
  );
};
