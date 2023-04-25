import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledPassword from '../../../../components/controlledFields/Password';
import InstallationInfoCard from '../../../../components/installationInfoCard';
import { InstallationInfo, LocalInstallValues } from '../../../../types/redux';

import { Container, Form } from './localSetupForm.styled';

export interface LocalSetupFormProps {
  onFormSubmit: (values: LocalInstallValues) => void;
  info: InstallationInfo;
}

export const LocalSetupForm = forwardRef<HTMLFormElement, LocalSetupFormProps>(
  function LocalSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<LocalInstallValues>();

    const { onFormSubmit, info } = props;

    return (
      <Container>
        <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
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
            rules={{ required: false }}
            label="GitOps template override"
          />
          <ControlledTextField
            control={control}
            name="templateRepoUrl"
            rules={{ required: false }}
            label="GitOps template branch"
          />
        </Form>
        <InstallationInfoCard info={info} />
      </Container>
    );
  },
);
