import React, { FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import DnsProvider from '../../../clusterForms/shared/dnsProvider';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../../components/controlledFields/TextField';
// import LearnMore from '../../../../components/learnMore';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { getCloudDomains } from '../../../../redux/thunks/api.thunk';
import { InstallValues } from '../../../../types/redux';
import { EMAIL_REGEX } from '../../../../constants/index';

const AwsSetupForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control, reset }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const dispatch = useAppDispatch();
  const { cloudDomains, cloudRegions, values } = useAppSelector(({ api, installation }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
    values: installation.values,
  }));

  const handleRegionOnSelect = async (region: string) => {
    setSelectedRegion(region);
    dispatch(getCloudDomains({ region }));
  };

  const formatDomains = (domains: Array<string>) => {
    return domains.map((domain) => {
      const formattedDomain = domain[domain.length - 1].includes('.')
        ? domain.substring(0, domain.length - 1)
        : domain;
      return { label: formattedDomain, value: formattedDomain };
    });
  };

  const { control } = useFormContext<InstallValues>();

  return (
    <>
      <ControlledTextField
        control={control}
        name="alertsEmail"
        label="Alerts Email"
        onErrorText="Invalid email address."
        defaultValue={values?.alertsEmail}
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
        defaultValue={values?.cloudRegion}
        required
        rules={{ required: true }}
        options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
        onChange={handleRegionOnSelect}
      />
      <DnsProvider control={control} selectedRegion={selectedRegion} reset={reset} />
      <ControlledAutocomplete
        control={control}
        name="domainName"
        label="Cluster domain name"
        defaultValue={values?.domainName}
        required
        rules={{ required: true }}
        options={cloudDomains && formatDomains(cloudDomains)}
      />
      <ControlledTextField
        control={control}
        name="clusterName"
        defaultValue={values?.clusterName}
        label="Cluster name"
        rules={{
          maxLength: 25,
          required: true,
        }}
        onErrorText="Maximum 25 characters."
        required
      />
      {/* <LearnMore description="Learn more about" href="" linkTitle="configuring your cluster" /> */}
    </>
  );
};

export default AwsSetupForm;
