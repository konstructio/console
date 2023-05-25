import React, { FunctionComponent } from 'react';
import { FormFlowProps } from 'types/provision';

import LearnMore from '../../../../components/learnMore';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { getCloudDomains } from '../../../../redux/thunks/api.thunk';
import { EMAIL_REGEX } from '../../../../constants';
import { InstallValues } from '../../../../types/redux';

const DigitalOceanSetupForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const dispatch = useAppDispatch();
  const { cloudDomains, cloudRegions } = useAppSelector(({ api }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
  }));

  const handleRegionOnSelect = async (region: string) => {
    dispatch(getCloudDomains(region));
  };

  return (
    <>
      <ControlledTextField
        control={control}
        name="alertsEmail"
        label="Alerts email"
        helperText="This email address will receive important system notifications such cert expiry notices."
        required
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
      />
      <ControlledAutocomplete
        control={control}
        name="cloudRegion"
        label="Datacenter region"
        required
        rules={{ required: true }}
        options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
        onChange={handleRegionOnSelect}
      />
      <ControlledAutocomplete
        control={control}
        name="domainName"
        label="Cluster domain name"
        required
        rules={{ required: true }}
        options={cloudDomains && cloudDomains.map((domain) => ({ label: domain, value: domain }))}
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
        required
      />
      <LearnMore description="Learn more about" href="" linkTitle="configuring your cluster" />
    </>
  );
};

export default DigitalOceanSetupForm;
