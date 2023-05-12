import React, { FunctionComponent, useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';

import { clearError, setGitProvider, setInstallType } from '../../redux/slices/installation.slice';
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
  reset,
}) => {
  const dispatch = useAppDispatch();

  const { installType, gitProvider } = useAppSelector(({ installation }) => installation);

  const clearState = useCallback(() => {
    dispatch(clearGitState());
    dispatch(clearError());
    reset();
  }, [dispatch, reset]);

  const handleInstallTypeChange = useCallback(
    (type: InstallationType) => {
      dispatch(setInstallType(type));
      clearState();
    },
    [clearState, dispatch],
  );

  const handleGitProviderChange = useCallback(
    (provider: GitProvider) => {
      dispatch(setGitProvider(provider));
      clearState();
    },
    [clearState, dispatch],
  );

  return (
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
  );
};
