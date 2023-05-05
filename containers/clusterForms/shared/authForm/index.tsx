import React, { FunctionComponent, useEffect, useMemo } from 'react';

import LearnMore from '../../../../components/learnMore';
import { useInstallation } from '../../../../hooks/useInstallation';
import { FormStep } from '../../../../constants/installation';
import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { GitProvider } from '../../../../types';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues, InstallationType } from '../../../../types/redux/index';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  getGithubUser,
  getGithubUserOrganizations,
  getGitlabGroups,
  getGitlabUser,
} from '../../../../redux/thunks/git.thunk';

const AuthForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control, setValue }) => {
  const dispatch = useAppDispatch();

  const {
    gitProvider,
    githubUser,
    githubUserOrganizations,
    gitlabUser,
    gitlabGroups,
    gitStateLoading,
    installationType,
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

  const handleGitTokenBlur = async (token: string) => {
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
  };

  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

  useEffect(() => {
    if (githubUser?.login || gitlabUser?.name) {
      setValue('userName', githubUser?.login || gitlabUser?.name);
    }
  }, [githubUser, gitlabUser, setValue]);

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
        onBlur={handleGitTokenBlur}
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
          disabled={!githubUser}
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
          disabled={!gitlabUser}
          options={
            gitlabGroups && gitlabGroups.map(({ name, path }) => ({ label: name, value: path }))
          }
          loading={gitStateLoading}
          label="GitLab group name"
          placeholder="Select"
        />
      )}
      <ControlledPassword
        control={control}
        name="cloudToken"
        label={apiKeyInfo?.label as string}
        helperText={apiKeyInfo?.helperText}
        required
        rules={{
          required: true,
        }}
        onErrorText="Invalid token."
      />
      <LearnMore description="Learn more about" href="" linkTitle="authentication" />
    </>
  );
};

export default AuthForm;
