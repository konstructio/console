import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { CivoGithubClusterValues } from '../../../../types/redux/index';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { CIVO_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { GithubUserOrganization } from '../../../../types/github/index';

import { Form } from './CivoGithubSetupForm.styled';

export interface CivoGithubSetupFormProps {
  hasTokenValue: boolean;
  githubTokenValid: boolean;
  githubUserOrginizations: GithubUserOrganization[];
  onGithubTokenBlur: (token: string) => void;
  onFormSubmit: (values: CivoGithubClusterValues) => void;
  loading: boolean;
}

export const CivoGithubSetupForm = forwardRef<HTMLFormElement, CivoGithubSetupFormProps>(
  function CivoGithubSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<CivoGithubClusterValues>();

    const { loading, githubUserOrginizations, onFormSubmit } = props;

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
        <ControlledTextField
          control={control}
          name="adminEmail"
          label="Admin email"
          onErrorText="Invalid email address."
          required
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
        />
        <ControlledAutocomplete
          control={control}
          name="region"
          label="Region"
          required
          rules={{ required: true }}
          options={CIVO_REGIONS}
        />
        <ControlledTextField
          control={control}
          name="civoToken"
          label="Registered domain"
          required
          rules={{
            required: true,
          }}
        />
        <ControlledTextField
          control={control}
          name="clusterName"
          label="Cluster name"
          defaultValue="kubefirst"
          rules={{
            maxLength: 25,
            required: true,
          }}
          onErrorText="Maximum 25 characters."
        />
        {/* <ControlledPassword
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
        /> */}
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
      </Form>
    );
  },
);
