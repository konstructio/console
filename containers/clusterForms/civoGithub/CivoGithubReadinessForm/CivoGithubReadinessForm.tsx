import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { CivoInstallValues } from '../../../../types/redux/index';
import { GithubUserOrganization } from '../../../../types/github';

import { Form } from './CivoGithubReadinessForm.styled';

export interface CivoGithubReadinessFormProps {
  onFormSubmit: (values: CivoInstallValues) => void;
  githubUserOrginizations: Array<GithubUserOrganization>;
  onGithubTokenBlur: (token: string) => void;
  hasTokenValue: boolean;
  githubTokenValid: boolean;
  loading: boolean;
}

export const CivoGithubReadinessForm = forwardRef<HTMLFormElement, CivoGithubReadinessFormProps>(
  function CivoRadinessForm(props, ref) {
    const { onFormSubmit, githubUserOrginizations, onGithubTokenBlur, loading, githubTokenValid } =
      props;

    const { control, handleSubmit } = useForm<CivoInstallValues>();

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
        <ControlledPassword
          control={control}
          name="githubToken"
          label="GitHub personal access token"
          required
          rules={{
            required: true,
          }}
          onBlur={onGithubTokenBlur}
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
          disabled={!githubTokenValid}
          options={
            githubUserOrginizations &&
            githubUserOrginizations.map(({ login }) => ({ label: login, value: login }))
          }
          loading={loading}
          label="GitHub organization name"
          placeholder="Select"
        />
        <ControlledPassword
          control={control}
          name="civoToken"
          label="Civo API Key"
          helperText="Retrieve your key at https://dashboard.civo.com/security "
          required
          rules={{
            required: true,
          }}
          onErrorText="Invalid token."
        />
      </Form>
    );
  },
);
