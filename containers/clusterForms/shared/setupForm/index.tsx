'use client';
import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { capitalize } from 'lodash';

import { setInstallationStep } from '../../../../redux/slices/installation.slice';
import { clearDomains } from '../../../../redux/slices/api.slice';
import ControlledPassword from '../../../../components/controlledFields/Password';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { getCloudDomains } from '../../../../redux/thunks/api.thunk';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import Column from '../../../../components/column';
import Typography from '../../../../components/typography';
import ControlledCheckbox from '../../../../components/controlledFields/checkbox';
import { EMAIL_REGEX, LOWER_KEBAB_CASE_REGEX } from '../../../../constants';
import { InstallValues, InstallationType } from '../../../../types/redux';
import { GitProvider } from '../../../../types';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';
import { BISCAY } from '../../../../constants/colors';

const CLOUD_REGION_LABELS: Record<InstallationType, string | null> = {
  [InstallationType.AWS]: 'Cloud region',
  [InstallationType.CIVO]: 'Cloud region',
  [InstallationType.DIGITAL_OCEAN]: 'Datacenter region',
  [InstallationType.VULTR]: 'Cloud location',
  [InstallationType.LOCAL]: null,
  [InstallationType.GOOGLE]: 'Cloud zone',
};

const SetupForm: FunctionComponent = () => {
  const [isCloudFlareSelected, setIsCloudFlareSelected] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<InstallValues>();

  const [domainName, subDomain] = watch(['domainName', 'subDomain']);

  const subDomainHelperText = !subDomain ? '' : `${subDomain}.${domainName}`;

  const { cloudDomains, cloudRegions, installationStep, installType, values, gitProvider } =
    useAppSelector(({ api, installation }) => ({
      cloudDomains: api.cloudDomains,
      cloudRegions: api.cloudRegions,
      installationStep: installation.installationStep,
      installType: installation.installType,
      values: installation.values,
      gitProvider: installation.gitProvider,
    }));

  const cloudRegionLabel = useMemo(
    () =>
      CLOUD_REGION_LABELS[installType as InstallationType] ||
      (CLOUD_REGION_LABELS[InstallationType.AWS] as string),
    [installType],
  );

  const checkAuth = useCallback(() => {
    if (!values?.gitToken) {
      dispatch(setInstallationStep(installationStep - 1));
    }
  }, [dispatch, installationStep, values?.gitToken]);

  const handleRegionOnSelect = async (region: string) => {
    setSelectedRegion(region);
    dispatch(getCloudDomains({ region }));
  };

  const formatDomains = (domains: Array<string>) => {
    return domains.map((domain) => {
      const formattedDomain =
        installType === InstallationType.AWS && domain[domain.length - 1].includes('.')
          ? domain.substring(0, domain.length - 1)
          : domain;
      return { label: formattedDomain, value: formattedDomain };
    });
  };

  const handleCloudfareToken = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = target;

    dispatch(getCloudDomains({ region: selectedRegion, cloudflareToken: value }));
  };

  const handleDnsProviderOnChange = (value: string) => {
    const isCloudflare = value === 'cloudflare';
    setIsCloudFlareSelected(isCloudflare);

    if (!isCloudflare) {
      dispatch(getCloudDomains({ region: selectedRegion }));
      setValue && setValue('cloudflareToken', '');
    } else {
      dispatch(clearDomains());
      setValue && setValue('domainName', '');
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Typography variant="subtitle2" color={BISCAY}>
        General Settings
      </Typography>
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
        helperText="This email address will receive important system notifications such cert expiry notices."
      />
      <ControlledAutocomplete
        control={control}
        name="cloudRegion"
        label={cloudRegionLabel}
        defaultValue={values?.cloudRegion}
        required
        rules={{ required: true }}
        options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
        onChange={handleRegionOnSelect}
      />
      <ControlledAutocomplete
        control={control}
        name="dnsProvider"
        label="Dns provider"
        defaultValue={values?.dnsProvider}
        required
        rules={{ required: true }}
        options={[
          { label: capitalize(installType as string), value: installType as string },
          { label: 'Cloudflare', value: 'cloudflare' },
        ]}
        onChange={handleDnsProviderOnChange}
      />
      {isCloudFlareSelected && (
        <>
          <ControlledPassword
            control={control}
            name="cloudflareToken"
            label="Cloudflare token"
            required
            rules={{
              required: true,
            }}
            onErrorText="Invalid token."
            onChange={handleCloudfareToken}
          />
          <ControlledPassword
            control={control}
            name="cloudflareOriginCaIssuerKey"
            label="Cloudflare origin ca issuer key"
            rules={{
              required: false,
            }}
            onErrorText="Invalid issuer key"
          />
        </>
      )}
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
        name="subDomain"
        label="Subdomain name"
        defaultValue={values?.subDomain}
        rules={{
          maxLength: 25,
        }}
        onErrorText={errors.subDomain?.message}
        helperText={subDomainHelperText}
      />
      <ControlledTextField
        control={control}
        name="clusterName"
        label="Cluster name"
        defaultValue={values?.clusterName}
        rules={{
          maxLength: 25,
          required: true,
          pattern: {
            value: LOWER_KEBAB_CASE_REGEX,
            message: 'Please use lower kebab case for cluster name',
          },
        }}
        onErrorText={errors.clusterName?.message}
        required
      />
      {installType === InstallationType.GOOGLE && gitProvider === GitProvider.GITHUB && (
        <CheckBoxContainer>
          <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
            Automatically remove cloud provider resources such as buckets or kms keys when a worker
            cluster is deleted
          </Typography>
          <ControlledCheckbox
            control={control}
            name="forceDestroyTerraform"
            label="Enable Force Destroy on Terraform resources"
            rules={{ required: false }}
            defaultValue={true}
          />
        </CheckBoxContainer>
      )}
      {/* <LearnMore description="Learn more about" href="" linkTitle="configuring your cluster" /> */}
    </>
  );
};

export default SetupForm;

const CheckBoxContainer = styled(Column)`
  gap: 9px;

  label {
    margin-left: 8px;
  }
`;
