import React, { FunctionComponent, useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';

import InstallationStepContainer from '../../components/installationStepContainer';
import {
  setGitProvider,
  setInstallType,
  setInstallationStep,
} from '../../redux/slices/installation.slice';
import GitProviderButton from '../../components/gitProviderButton';
import CloudProviderCard from '../../components/cloudProviderCard';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { INSTALLATION_TYPES, InstallValues, InstallationType } from '../../types/redux';
import { clearGitState } from '../../redux/slices/git.slice';
import { GIT_PROVIDERS, GitProvider } from '../../types';

import {
  ContentContainer,
  ButtonContainer,
  AdventureContent,
  Subtitle,
  CloudProviderContainer,
} from './installationsSelection.styled';

export interface InstallationsSelectionProps {
  steps: Array<string>;
  reset: UseFormReset<InstallValues>;
}

export const InstallationsSelection: FunctionComponent<InstallationsSelectionProps> = ({
  steps,
  reset,
}) => {
  const dispatch = useAppDispatch();

  const { installType, gitProvider, installationStep } = useAppSelector(
    ({ installation }) => installation,
  );

  const handleInstallTypeChange = useCallback(
    (type: InstallationType) => {
      dispatch(setInstallType(type));
      dispatch(clearGitState());
      reset();
    },
    [dispatch, reset],
  );

  const handleGitProviderChange = useCallback(
    (provider: GitProvider) => {
      dispatch(setGitProvider(provider));
    },
    [dispatch],
  );

  const handleNextButtonClick = useCallback(() => {
    dispatch(setInstallationStep(1));
  }, [dispatch]);

  return (
    <InstallationStepContainer
      activeStep={installationStep}
      steps={steps}
      installationTitle="First, select your preferred Git provider"
      showBackButton={false}
      onNextButtonClick={handleNextButtonClick}
      nextButtonDisabled={!installType}
    >
      <ContentContainer>
        <ButtonContainer>
          {GIT_PROVIDERS.map((provider) => (
            <GitProviderButton
              key={provider}
              option={provider}
              active={provider === gitProvider}
              onClick={() => handleGitProviderChange(provider)}
            />
          ))}
        </ButtonContainer>
        {gitProvider && (
          <AdventureContent>
            <Subtitle variant="subtitle2">Now Select your cloud adventure</Subtitle>
            <CloudProviderContainer>
              {INSTALLATION_TYPES.map((type) => (
                <CloudProviderCard
                  key={type}
                  option={type}
                  active={type === installType}
                  onClick={() => handleInstallTypeChange(type)}
                />
              ))}
            </CloudProviderContainer>
          </AdventureContent>
        )}
      </ContentContainer>
    </InstallationStepContainer>
  );
};
