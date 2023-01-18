import React, { FunctionComponent } from 'react';
import { Control, Controller } from 'react-hook-form';

import Password from '../../../../components/password/';
import TextField from '../../../../components/textField';

export interface FormProps {
  control: Control;
}

const SetupForm: FunctionComponent<FormProps> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="githubToken"
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <Password
            {...field}
            inputRef={field.ref}
            error={error !== undefined}
            fullWidth
            label="GitHub token"
            helperText="Note: this token will expire in 8 hours"
            sx={{ mb: '24px', width: '100%' }}
          />
        )}
      />
      <Controller
        control={control}
        name="gitOpsBranch"
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            inputRef={field.ref}
            fullWidth
            label="GitOps branch"
            error={error !== undefined}
            sx={{ mb: '24px', width: '100%' }}
          />
        )}
      />
      <Controller
        control={control}
        name="templateRepoUrl"
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            inputRef={field.ref}
            fullWidth
            label="Template repo url"
            sx={{ mb: '24px', width: '100%' }}
            error={error !== undefined}
          />
        )}
      />
    </>
  );
};

export default SetupForm;
