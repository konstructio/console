import React, { FunctionComponent } from 'react';
import { Control, FieldValues, UseFormWatch } from 'react-hook-form';

import ControlledAutocomplete from '../../../controlledFields/AutoComplete';
import ControlledPassword from '../../../controlledFields/Password';
import ControlledCheckbox from '../../../controlledFields/Checkbox';
import { AWS_REGIONS } from '../../../../utils/region';
import { getUser, getGitUserOrganizations } from '../../../../redux/actions/github.action';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  selectGitUserOrganizations,
  selectIsLoading,
  selectIsValidToken,
} from '../../../../redux/selectors/github.selector';
import ControlledTextField from '../../../controlledFields/TextField';

export interface FormProps {
  control: Control;
  watch: UseFormWatch<FieldValues>;
}

const EMAIL_REGEX = /.+@.+\..+/;

const SetupForm: FunctionComponent<FormProps> = ({ control }) => {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(selectGitUserOrganizations());
  const isValidToken = useAppSelector(selectIsValidToken());
  const isLoading = useAppSelector(selectIsLoading());

  const handleGitHubTokenOnBlur = (token: string) => {
    dispatch(getUser(token)).unwrap();
    dispatch(getGitUserOrganizations(token)).unwrap();
  };

  return (
    <>
      <ControlledTextField
        control={control}
        name="adminEmail"
        label="Admin Email"
        onErrorText="Invalid email address."
        required
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
      />
      <ControlledPassword
        control={control}
        name="kbotPassword"
        rules={{ required: true }}
        required
        label="Create K-bot password"
      />
      <ControlledAutocomplete
        control={control}
        name="region"
        label="Region"
        required
        rules={{ required: true }}
        options={AWS_REGIONS}
      />
      <ControlledTextField
        control={control}
        name="clusterName"
        label="Cluster name"
        required
        rules={{
          maxLength: 25,
          required: true,
        }}
        onErrorText="Maximum 25 characters."
      />
      <ControlledTextField
        control={control}
        name="bucketName"
        label="S3 bucket name"
        required
        rules={{
          maxLength: 63,
          required: true,
        }}
        onErrorText="Maximum 63 characters."
      />
      <ControlledPassword
        control={control}
        name="githubToken"
        label="GitHub token"
        rules={{
          required: true,
        }}
        required
        onBlur={handleGitHubTokenOnBlur}
        helperText="Note: this token will expire in 8 hours"
      />
      <ControlledAutocomplete
        control={control}
        required
        name="githubOrganization"
        rules={{ required: true }}
        loading={isLoading}
        disabled={!isValidToken}
        options={organizations.map(({ login }) => ({ label: login, value: login }))}
        label="Github organization"
        placeholder="Select"
      />
      <ControlledCheckbox
        control={control}
        name="awsNodesSpot"
        rules={{ required: false }}
        label="AWS nodes spot"
      />
    </>
  );
};

export default SetupForm;
