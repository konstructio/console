import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { CivoGithubClusterValues } from '../../../../types/redux/index';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { CIVO_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';

import { Form } from './CivoGithubSetupForm.styled';

export interface CivoGithubSetupFormProps {
  onFormSubmit: (values: CivoGithubClusterValues) => void;
  loading: boolean;
}

export const CivoGithubSetupForm = forwardRef<HTMLFormElement, CivoGithubSetupFormProps>(
  function CivoGithubSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<CivoGithubClusterValues>();

    const { onFormSubmit } = props;

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
        <ControlledTextField
          control={control}
          name="alertsEmail"
          label="Alerts email"
          onErrorText="Invalid email address."
          required
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
        />
        <ControlledAutocomplete
          control={control}
          name="cloudRegion"
          label="Cloud Region"
          required
          rules={{ required: true }}
          options={CIVO_REGIONS}
        />
        <ControlledTextField
          control={control}
          name="domainName"
          label="Cluster domain name"
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
      </Form>
    );
  },
);
