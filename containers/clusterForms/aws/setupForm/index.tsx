import React, { FunctionComponent, useEffect } from 'react';

import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import LearnMore from '../../../../components/learnMore';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { getCloudDomains, getCloudRegions } from '../../../../redux/thunks/api.thunk';
import { InstallValues } from '../../../../types/redux';
import { FormFlowProps } from '../../../../types/provision';
import { EMAIL_REGEX } from '../../../../constants/index';

const AwsSetupForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const dispatch = useAppDispatch();
  const { cloudDomains, cloudRegions } = useAppSelector(({ api }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
  }));

  const handleRegionOnSelect = async (region: string) => {
    dispatch(getCloudDomains(region));
  };

  const formatDomains = (domains: Array<string>) => {
    return domains.map((domain) => {
      const formattedDomain = domain[domain.length - 1].includes('.')
        ? domain.substring(0, domain.length - 1)
        : domain;
      return { label: formattedDomain, value: formattedDomain };
    });
  };

  useEffect(() => {
    dispatch(getCloudRegions());
  }, [dispatch]);

  return (
    <>
      <ControlledTextField
        control={control}
        name="alertsEmail"
        label="Alerts Email"
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
        label="Cloud region"
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
        options={cloudDomains && formatDomains(cloudDomains)}
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

export default AwsSetupForm;
