import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledPassword from '../../../../components/controlledFields/Password';
import { LocalInstallValues } from '../../../../types/redux';
import FormContainer from '../../../../components/FormContainer/FormContainer';

export interface LocalSetupFormProps {
  onFormSubmit: (values: LocalInstallValues) => void;
}

export const LocalSetupForm = forwardRef<HTMLFormElement, LocalSetupFormProps>(
  function LocalSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<LocalInstallValues>();

    const { onFormSubmit, ...rest } = props;

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref} {...rest}>
        <ControlledPassword
          control={control}
          name="githubToken"
          label="GitHub token"
          rules={{
            required: true,
          }}
          required
          helperText="Note: this token will expire in 8 hours"
        />
        <ControlledTextField
          control={control}
          name="gitOpsBranch"
          rules={{ required: true }}
          label="GitOps branch"
          required
        />
        <ControlledTextField
          control={control}
          name="templateRepoUrl"
          rules={{ required: false }}
          label="Template repo url"
        />
      </Form>
    );
  },
);

const Form = styled(FormContainer)`
  gap: 20px;
`;
