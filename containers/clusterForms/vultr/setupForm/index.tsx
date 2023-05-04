import React, { FunctionComponent } from 'react';

import LearnMore from '../../../../components/learnMore';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { InstallValues } from '../../../../types/redux';
import { FormFlowProps } from '../../../../types/provision';
import { CIVO_REGIONS, EMAIL_REGEX } from '../../../../constants';

const CivoSetupForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  return (
    <>
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
        label="Cluster location"
        required
        rules={{ required: true }}
        options={CIVO_REGIONS}
      />
      <ControlledTextField
        control={control}
        name="domainName"
        label="Cluster hostname"
        required
        rules={{
          required: true,
        }}
      />
      <ControlledTextField
        control={control}
        name="clusterName"
        label="Cluster name"
        rules={{
          maxLength: 25,
          required: true,
        }}
        onErrorText="Maximum 25 characters."
      />
      <LearnMore description="Learn more about" href="" linkTitle="configuring your cluster" />
    </>
  );
};

export default CivoSetupForm;
