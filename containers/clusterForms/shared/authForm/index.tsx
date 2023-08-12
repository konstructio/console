import React, { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

import { Required } from '../../../../components/textField/textField.styled';
import GitProviderButton from '../../../../components/gitProviderButton';
import Typography from '../../../../components/typography';
import { useInstallation } from '../../../../hooks/useInstallation';
// import LearnMore from '../../../../components/learnMore';
import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { GIT_PROVIDERS, GitProvider } from '../../../../types';
import { InstallValues, InstallationType } from '../../../../types/redux/index';
import { FormStep } from '../../../../constants/installation';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';
import {
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitLabProjects,
  getGitLabSubgroups,
  getGithubUser,
  getGithubUserOrganizations,
  getGitlabGroups,
  getGitlabUser,
} from '../../../../redux/thunks/git.thunk';
import {
  setToken,
  clearUserError,
  setGitOwner,
  clearGitState,
  setIsGitSelected,
} from '../../../../redux/slices/git.slice';
import { setGitProvider } from '../../../../redux/slices/installation.slice';

import { FormContainer, GitContainer, GitUserField, GitUserFieldInput } from './authForm.styled';

const AuthForm: FunctionComponent = () => {
  const [isGitRequested, setIsGitRequested] = useState<boolean>();
  const [gitUserName, setGitUserName] = useState<string>();

  const dispatch = useAppDispatch();

  const {
    gitProvider,
    githubUser,
    githubUserOrganizations,
    gitlabUser,
    gitlabGroups,
    gitStateLoading,
    installationType,
    isGitSelected,
    isTokenValid,
    installMethod,
    token = '',
  } = useAppSelector(({ config, installation, git }) => ({
    currentStep: installation.installationStep,
    installationType: installation.installType,
    gitProvider: installation.gitProvider,
    isGitSelected: git.isGitSelected,
    gitStateLoading: git.isLoading,
    installMethod: config.installMethod,
    ...git,
  }));

  const { apiKeyInfo } = useInstallation(
    installationType as InstallationType,
    gitProvider as GitProvider,
    FormStep.AUTHENTICATION,
  );

  const { control, reset, setValue } = useFormContext<InstallValues>();

  const isGitHub = useMemo(() => gitProvider === GitProvider.GITHUB, [gitProvider]);

  const validateGitOwner = async (gitOwner: string) => {
    dispatch(setGitOwner(gitOwner));
    await dispatch(clearUserError());

    if (gitOwner) {
      if (isGitHub) {
        await dispatch(getGitHubOrgRepositories({ token, organization: gitOwner })).unwrap();
        await dispatch(getGitHubOrgTeams({ token, organization: gitOwner })).unwrap();
      } else {
        await dispatch(getGitLabProjects({ token, group: gitOwner }));
        await dispatch(getGitLabSubgroups({ token, group: gitOwner }));
      }
    }
  };

  const handleGitTokenBlur = async (token: string) => {
    await dispatch(clearUserError());
    await dispatch(setToken(token));

    try {
      if (isGitHub) {
        await dispatch(getGithubUser(token)).unwrap();
        await dispatch(getGithubUserOrganizations(token)).unwrap();
      } else {
        await dispatch(getGitlabUser(token)).unwrap();
        await dispatch(getGitlabGroups(token)).unwrap();
      }
    } catch (error) {
      // error processed in redux state
    }

    setIsGitRequested(true);
  };

  const gitTokenDebounce = debounce((token) => handleGitTokenBlur(token), 1000);
  const handleOnChangeToken = async ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = target;

    if (isTokenValid) {
      setGitUserName('');
      await dispatch(clearGitState());
    }

    if (value) {
      gitTokenDebounce(value);
    }
  };

  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

  const isMarketplace = useMemo(() => installMethod?.includes('marketplace'), [installMethod]);

  const gitErrorLabel = useMemo(
    () => (isGitHub ? 'GitHub organization' : 'GitLab group'),
    [isGitHub],
  );

  const handleGitProviderChange = (provider: GitProvider) => {
    setGitUserName('');
    reset && reset({ gitToken: '', gitOwner: '' });
    dispatch(clearGitState());
    dispatch(setIsGitSelected(true));
    dispatch(setGitProvider(provider));
  };

  useEffect(() => {
    if (githubUser?.login || gitlabUser?.name) {
      setGitUserName(githubUser?.login || gitlabUser?.name);
    }
  }, [dispatch, githubUser, gitlabUser, setValue]);

  useEffect(() => {
    return () => {
      dispatch(clearUserError());
    };
  }, [dispatch, gitErrorLabel, isGitHub]);

  return (
    <>
      {isMarketplace && (
        <div>
          <Typography
            variant="labelLarge"
            color={EXCLUSIVE_PLUM}
            sx={{ display: 'flex', gap: '6px' }}
          >
            Select your preferred GIT provider <Required>*</Required>
          </Typography>
          <GitContainer>
            {GIT_PROVIDERS.map((provider) => (
              <GitProviderButton
                key={provider}
                option={provider}
                active={provider === gitProvider && isGitSelected}
                onClick={() => handleGitProviderChange(provider)}
              />
            ))}
          </GitContainer>
        </div>
      )}
      <FormContainer isVisible={!isMarketplace || (isMarketplace && isGitSelected)}>
        <ControlledPassword
          control={control}
          name="gitToken"
          label={`${gitLabel} personal access token`}
          required
          rules={{
            required: true,
          }}
          error={isGitRequested && !isTokenValid}
          onBlur={handleGitTokenBlur}
          onChange={handleOnChangeToken}
          onErrorText="Invalid token."
        />
        <GitUserField>
          <Typography
            variant="labelLarge"
            sx={{ display: 'flex', gap: '4px' }}
            color={EXCLUSIVE_PLUM}
          >{`Username associated with ${gitLabel} token`}</Typography>
          <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
        </GitUserField>
        {isGitHub ? (
          <ControlledAutocomplete
            control={control}
            required
            name="gitOwner"
            rules={{ required: true }}
            onChange={validateGitOwner}
            options={
              githubUserOrganizations &&
              githubUserOrganizations.map(({ login }) => ({ label: login, value: login }))
            }
            loading={gitStateLoading}
            label="GitHub organization name"
          />
        ) : (
          <ControlledAutocomplete
            control={control}
            required
            name="gitOwner"
            rules={{ required: true }}
            onChange={validateGitOwner}
            options={
              gitlabGroups && gitlabGroups.map(({ name, path }) => ({ label: name, value: path }))
            }
            loading={gitStateLoading}
            label="GitLab group name"
          />
        )}
        {apiKeyInfo?.fieldKeys.map(({ label, name, helperText }) => (
          <ControlledPassword
            key={name}
            control={control}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            name={`${apiKeyInfo.authKey}.${name}`}
            label={label}
            helperText={helperText}
            required
            rules={{
              required: true,
            }}
          />
        ))}
      </FormContainer>
      {/* <LearnMore description="Learn more about" href="" linkTitle="authentication" /> */}
    </>
  );
};

export default AuthForm;
