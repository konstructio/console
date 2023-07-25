import React, { FunctionComponent } from 'react';

import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledPassword from '../../../../components/controlledFields/Password';
// import LearnMore from '../../../../components/learnMore';
import { InstallValues } from '../../../../types/redux';
import { FormFlowProps } from '../../../../types/provision';

export const LocalSetupForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  return (
    <>
      <ControlledPassword
        control={control}
        name="gitToken"
        label="GitHub token"
        rules={{
          required: true,
        }}
        required
        helperText="Note: this token will expire in 8 hours"
      />
      <ControlledTextField
        control={control}
        name="gitopsTemplateBranch"
        rules={{ required: false }}
        label="GitOps template override"
      />
      <ControlledTextField
        control={control}
        name="gitopsTemplateUrl"
        rules={{ required: false }}
        label="GitOps template branch"
      />
      {/* <LearnMore description="Learn more about" href="" linkTitle="configuring your cluster" /> */}
    </>
  );
};
