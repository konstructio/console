import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Control, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { getCloudDomains } from 'redux/thunks/api.thunk';

import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { clearDomains } from '../../../../redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { InstallValues } from '../../../../types/redux';
import ControlledPassword from '../../../../components/controlledFields/Password';

export interface DnsProviderProps {
  control: Control<InstallValues>;
  reset?: UseFormReset<InstallValues>;
  selectedRegion: string;
  setValue: UseFormSetValue<InstallValues>;
}

const DnsProvider: FunctionComponent<DnsProviderProps> = ({ control, reset, selectedRegion }) => {
  const dispatch = useAppDispatch();
  const [isCloudFlareSelected, setIsCloudFlareSelected] = useState<boolean>(false);

  const { installType } = useAppSelector(({ api, installation }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
    values: installation.values,
    installType: installation.installType,
  }));

  const handleCloudfareToken = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = target;

    dispatch(getCloudDomains({ region: selectedRegion, cloudflareToken: value }));
  };

  const handleDnsProviderOnChange = (value: string) => {
    const isCloudflare = value === 'cloudflare';
    setIsCloudFlareSelected(isCloudflare);
    reset && reset({ cloudflareToken: '' });

    if (!isCloudflare) {
      dispatch(getCloudDomains({ region: selectedRegion }));
    } else {
      dispatch(clearDomains());
    }
  };

  return (
    <>
      <ControlledAutocomplete
        control={control}
        name="dnsProvider"
        label="DNS provider"
        options={[
          { label: installType as string, value: installType as string },
          { label: 'cloudflare', value: 'cloudflare' },
        ]}
        onChange={handleDnsProviderOnChange}
        required
        rules={{ required: true }}
      />
      {isCloudFlareSelected && (
        <ControlledPassword
          control={control}
          name="cloudflareToken"
          label="Cloudflare API key"
          required
          rules={{
            required: true,
          }}
          onChange={handleCloudfareToken}
        />
      )}
    </>
  );
};

export default DnsProvider;
