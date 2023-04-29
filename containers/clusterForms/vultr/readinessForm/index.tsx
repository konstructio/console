import React, { FunctionComponent, useEffect } from 'react';

import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { InstallValues } from '../../../../types/redux/index';
import { FormFlowProps } from '../../../../types/provision';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { getGithubUser, getGithubUserOrganizations } from '../../../../redux/thunks/git.thunk';

const CivoReadinessForm: FunctionComponent<FormFlowProps<InstallValues>> = ({
  control,
  setValue,
}) => {
  const dispatch = useAppDispatch();

  const { githubUser, githubUserOrganizations, gitStateLoading } = useAppSelector(
    ({ installation, git }) => ({
      currentStep: installation.installationStep,
      gitStateLoading: git.isLoading,
      ...git,
    }),
  );

  const handleGithubTokenBlur = async (token: string) => {
    try {
      await dispatch(getGithubUser(token)).unwrap();
      await dispatch(getGithubUserOrganizations(token)).unwrap();
    } catch (error) {
      // error processed in redux state
    }
  };

  useEffect(() => {
    if (githubUser?.login) {
      setValue('userName', githubUser?.login);
    }
  }, [githubUser, setValue]);

  return (
    <>
      <ControlledPassword
        control={control}
        name="githubToken"
        label="GitHub personal access token"
        required
        rules={{
          required: true,
        }}
        onBlur={handleGithubTokenBlur}
        onErrorText="Invalid token."
      />
      <ControlledTextField
        control={control}
        name="userName"
        label="Username associated with GitHub token"
        disabled
        rules={{
          required: false,
        }}
      />
      <ControlledAutocomplete
        control={control}
        required
        name="githubOrganization"
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
      <ControlledPassword
        control={control}
        name="vultrToken"
        label="Vultr API key"
        helperText="Retrieve your key at https://my.vultr.com/settings/#settingsapi"
        required
        rules={{
          required: true,
        }}
        onErrorText="Invalid token."
      />
    </>
  );
};

export default CivoReadinessForm;
