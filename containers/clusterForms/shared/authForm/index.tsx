import React, { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

import { useInstallation } from '../../../../hooks/useInstallation';
// import LearnMore from '../../../../components/learnMore';
import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { GitProvider } from '../../../../types';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues, InstallationType } from '../../../../types/redux/index';
import { FormStep } from '../../../../constants/installation';
import {
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitLabProjects,
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
} from '../../../../redux/slices/git.slice';

const AuthForm: FunctionComponent<FormFlowProps<InstallValues>> = ({
  control,
  reset,
  setValue,
}) => {
  const [isGitRequested, setIsGitRequested] = useState<boolean>();
  const dispatch = useAppDispatch();

  const {
    gitProvider,
    githubUser,
    githubUserOrganizations,
    gitlabUser,
    gitlabGroups,
    gitStateLoading,
    installationType,
    isTokenValid,
    token = '',
  } = useAppSelector(({ installation, git }) => ({
    currentStep: installation.installationStep,
    installationType: installation.installType,
    gitProvider: installation.gitProvider,
    gitStateLoading: git.isLoading,
    ...git,
  }));

  const { apiKeyInfo } = useInstallation(
    installationType as InstallationType,
    gitProvider as GitProvider,
    FormStep.AUTHENTICATION,
  );
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
      reset && reset({ userName: '' });
      await dispatch(clearGitState());
    }

    if (value) {
      gitTokenDebounce(value);
    }
  };

  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

  const gitErrorLabel = useMemo(
    () => (isGitHub ? 'GitHub organization' : 'GitLab group'),
    [isGitHub],
  );

  useEffect(() => {
    if (githubUser?.login || gitlabUser?.name) {
      setValue('userName', githubUser?.login || gitlabUser?.name);
    }
  }, [dispatch, githubUser, gitlabUser, setValue]);

  useEffect(() => {
    return () => {
      dispatch(clearUserError());
    };
  }, [dispatch, gitErrorLabel, isGitHub]);

  return (
    <>
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
      <ControlledTextField
        control={control}
        name="userName"
        label={`Username associated with ${gitLabel} token`}
        disabled
        rules={{
          required: false,
        }}
      />
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
          placeholder="Select"
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
          placeholder="Select"
        />
      )}
      {apiKeyInfo?.fieldKeys.map(({ label, name, helperText }) => (
        <ControlledPassword
          key={name}
          control={control}
          name={`${apiKeyInfo.authKey}.${name}`}
          label={label}
          helperText={helperText}
          required
          rules={{
            required: true,
          }}
        />
      ))}
      {/* <LearnMore description="Learn more about" href="" linkTitle="authentication" /> */}
    </>
  );
};

export default AuthForm;
