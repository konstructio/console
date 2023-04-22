import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { AwsGithubClusterValues } from '../../../../types/redux';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledCheckbox from '../../../../components/controlledFields/Checkbox';
import { AWS_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { GithubUserOrganization } from '../../../../types/github';

import { Form } from './AwsGithubSetupForm.styled';

export interface AwsGithubSetupFormProps {
  hasTokenValue: boolean;
  githubTokenValid: boolean;
  githubUserOrginizations: GithubUserOrganization[];
  onGithubTokenBlur: (token: string) => void;
  onFormSubmit: (values: AwsGithubClusterValues) => void;
  loading: boolean;
}

export const AwsGithubSetupForm = forwardRef<HTMLFormElement, AwsGithubSetupFormProps>(
  function AwsGithubSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<AwsGithubClusterValues>();

    const {
      onGithubTokenBlur,
      hasTokenValue,
      githubTokenValid,
      loading,
      githubUserOrginizations,
      onFormSubmit,
    } = props;

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
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
        <ControlledPassword
          control={control}
          name="githubToken"
          label="GitHub token"
          rules={{
            required: true,
          }}
          required
          onBlur={onGithubTokenBlur}
          helperText="Note: this token will expire in 8 hours"
          error={!githubTokenValid && hasTokenValue}
          onErrorText="Invalid token."
        />
        <ControlledAutocomplete
          control={control}
          required
          name="githubOrganization"
          rules={{ required: true }}
          loading={loading}
          disabled={false}
          options={githubUserOrginizations.map(({ login }) => ({ label: login, value: login }))}
          label="Github organization"
          placeholder="Select"
        />
        <ControlledCheckbox
          control={control}
          name="awsNodesSpot"
          rules={{ required: false }}
          label="AWS nodes spot"
        />
      </Form>
    );
  },
);
