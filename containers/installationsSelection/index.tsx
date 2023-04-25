import React, { FunctionComponent, useCallback } from 'react';
import { INSTALLATION_TYPES, InstallationType } from 'types/redux';
import GitProviderButton from 'components/gitProviderButton';
import { useRouter } from 'next/router';

import { GIT_PROVIDERS, GitProvider } from '../../types';
import InstallationStepContainer from '../../components/installationStepContainer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  setGitProvider,
  setInstallType,
  setInstallationStep,
} from '../../redux/slices/installation.slice';
import CloudProviderCard from '../../components/cloudProviderCard';

import {
  ContentContainer,
  ButtonContainer,
  AdventureContent,
  Subtitle,
  CloudProviderContainer,
} from './installationsSelection.styled';

export const InstallationsSelection: FunctionComponent = () => {
  const { installType, gitProvider, installationStep } = useAppSelector(
    ({ installation }) => installation,
  );

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  const handleInstallTypeChange = useCallback(
    (type: InstallationType) => {
      dispatch(setInstallType(type));
    },
    [dispatch],
  );

  const handleGitProviderChange = useCallback(
    (provider: GitProvider) => {
      dispatch(setGitProvider(provider));
    },
    [dispatch],
  );

  const handleNextButtonClick = useCallback(() => {
    dispatch(setInstallationStep(1));
    push(`installations/${installType}-${gitProvider}`);
  }, [dispatch, push, installType, gitProvider]);

  return (
    <InstallationStepContainer
      activeStep={installationStep}
      steps={['Select Platform', 'Set up Cluster', 'Provisioning', 'Ready']}
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
