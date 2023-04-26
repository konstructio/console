import React, { FunctionComponent, useRef, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
import { createCluster, deleteCluster } from '../../../../redux/thunks/cluster';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { currentStep, civoData, githubUser, githubUserOrganizations, gitStateLoading } =
    useAppSelector(({ installation, git }) => ({
      currentStep: installation.installationStep,
      civoData: installation.civoGithub,
      gitStateLoading: git.isLoading,
      ...git,
    }));

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

      if (currentStep === CivoGithubFormStep.SETUP) {
        const params = {
          clusterName: values.clusterName,
          admin_email: values.alertsEmail,
          cloud_provider: 'civo',
          cloud_region: values.cloudRegion,
          domain_name: values.domainName,
          git_owner: civoData?.githubOrganization,
          git_provider: 'github',
          git_token: civoData?.githubToken,
          type: 'mgmt',
        };
        await dispatch(createCluster(params))
          .unwrap()
          .then(() => {
            setInstallationStep(currentStep + 1);
          });
      }
    },
    [currentStep, dispatch, civoData?.githubOrganization, civoData?.githubToken],
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

  const handleDeleteCluster = () => {
    dispatch(deleteCluster(civoData?.clusterName)).unwrap();
  };

  const nextButtonText = currentStep === CivoGithubFormStep.SETUP ? 'Create cluster' : 'Next';

  // useEffect(() => {
  //   dispatch(setInstallationStep(4));
  // }, [dispatch]);

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
          <CivoGithubReadinessForm
            hasTokenValue={!!githubToken}
            githubTokenValid={!!githubUser}
            onFormSubmit={handleFormSubmit}
            githubUserOrginizations={githubUserOrganizations}
            onGithubTokenBlur={handleGithubTokenBlur}
            loading={gitStateLoading}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.SETUP && (
          <CivoGithubSetupForm
            loading={gitStateLoading}
            onFormSubmit={handleFormSubmit}
            ref={formRef}
          />
        )}
        {currentStep === CivoGithubFormStep.PREPARING && <TerminalLogs />}
        {currentStep === CivoGithubFormStep.READY && (
          <ClusterRunningMessage
            clusterName={civoData?.clusterName as string}
            domainName={civoData?.domainName as string}
            onDeleteCluster={handleDeleteCluster}
          />
        )}
      </ContentContainer>
    </InstallationStepContainer>
  );
};
