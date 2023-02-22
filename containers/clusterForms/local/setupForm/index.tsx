import React, { FunctionComponent } from 'react';
import { Control } from 'react-hook-form';

import ControlledTextField from '../../../controlledFields/TextField';
import ControlledPassword from '../../../controlledFields/Password';

export interface FormProps {
  control: Control;
}

const SetupForm: FunctionComponent<FormProps> = ({ control }) => {
  return (
    <>
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
    </>
  );
};

export default SetupForm;
