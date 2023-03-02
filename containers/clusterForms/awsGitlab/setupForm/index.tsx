import React, { FunctionComponent } from 'react';
import { Control } from 'react-hook-form';

import ControlledAutocomplete from '../../../controlledFields/AutoComplete';
import ControlledPassword from '../../../controlledFields/Password';
import ControlledCheckbox from '../../../controlledFields/Checkbox';
import { AWS_REGIONS } from '../../../../utils/region';
import ControlledTextField from '../../../controlledFields/TextField';
import { EMAIL_REGEX } from '../../../../utils/regex';

export interface FormProps {
  control: Control;
}

const SetupForm: FunctionComponent<FormProps> = ({ control }) => {
  return (
    <>
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
      <ControlledTextField
        control={control}
        name="bucketName"
        label="S3 bucket name"
        required
        rules={{
          maxLength: 63,
          required: true,
        }}
        onErrorText="Maximum 63 characters."
      />
      <ControlledCheckbox
        control={control}
        name="awsNodesSpot"
        rules={{ required: false }}
        label="AWS nodes spot"
      />
    </>
  );
};

export default SetupForm;
