import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import FormContainer from '../../../../components/formContainer/FormContainer';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledCheckbox from '../../../../components/controlledFields/Checkbox';
import { AWS_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { AwsClusterValues } from '../../../../types/redux';

export interface AwsGitlabSetupFormProps {
  onFormSubmit: (values: AwsClusterValues) => void;
}

const AwsGitlabSetupForm = forwardRef<HTMLFormElement, AwsGitlabSetupFormProps>(
  function AwsGitlabSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<AwsClusterValues>();

    const { onFormSubmit, ...rest } = props;

    return (
      <FormContainer component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref} {...rest}>
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
        <ControlledCheckbox
          control={control}
          name="awsNodesSpot"
          rules={{ required: false }}
          label="AWS nodes spot"
        />
      </FormContainer>
    );
  },
);

export default styled(AwsGitlabSetupForm)`
  gap: 20px;
`;
