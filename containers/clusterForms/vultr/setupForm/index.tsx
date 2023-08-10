import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

// import LearnMore from '../../../../components/learnMore';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { getCloudDomains } from '../../../../redux/thunks/api.thunk';
import { InstallValues } from '../../../../types/redux';
import { EMAIL_REGEX } from '../../../../constants';

const CivoSetupForm: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { cloudDomains, cloudRegions, values } = useAppSelector(({ api, installation }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
    values: installation.values,
  }));

  const { control } = useFormContext<InstallValues>();

  const handleRegionOnSelect = async (region: string) => {
    dispatch(getCloudDomains(region));
  };

  return (
    <>
      <ControlledTextField
        control={control}
        name="alertsEmail"
        label="Alerts email"
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
        label="Cluster location"
        defaultValue={values?.cloudRegion}
        required
        rules={{ required: true }}
        options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
        onChange={handleRegionOnSelect}
      />
      <ControlledAutocomplete
        control={control}
        name="domainName"
        label="Cluster domain name"
        defaultValue={values?.domainName}
        required
        rules={{ required: true }}
        options={cloudDomains && cloudDomains.map((domain) => ({ label: domain, value: domain }))}
      />
      <ControlledTextField
        control={control}
        name="clusterName"
        label="Cluster name"
        defaultValue={values?.clusterName}
        rules={{
          maxLength: 25,
          required: true,
        }}
        onErrorText="Maximum 25 characters."
      />
      {/* <LearnMore description="Learn more about" href="" linkTitle="configuring your cluster" /> */}
    </>
  );
};

export default CivoSetupForm;
