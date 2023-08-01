import React, { FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ControlledAutocomplete from '../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { getCloudDomains } from '../../../redux/thunks/api.thunk';
import ControlledSelect from '../../../components/controlledFields/Select';
import NumberInput from '../../../components/numberInput';
import Row from '../../../components/row';
import Button from '../../../components/button';

export type ClusterConfig = {
  clusterName?: string;
  domainName?: string;
  cloudRegion?: string;
  instanceSize?: string;
  nodeCount?: number;
};

const minNodeCount = 1;

const FinalForm: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { cloudDomains, cloudRegions, values } = useAppSelector(({ api, installation }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
    values: installation.values,
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

  const [value, setValue] = useState(minNodeCount);

  const { control, register } = useFormContext<ClusterConfig>();

  return (
    <>
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
      <Row style={{ alignItems: 'end', gap: '24px' }}>
        <ControlledAutocomplete
          control={control}
          name="domainName"
          label="Cluster domain name"
          defaultValue={values?.domainName}
          required
          rules={{ required: true }}
          options={cloudDomains && formatDomains(cloudDomains)}
        />
        <Button variant="outlined" color="primary" style={{ width: '156px' }}>
          Record created
        </Button>
      </Row>
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
      <ControlledSelect
        control={control}
        name="instanceSize"
        label="Instance size"
        rules={{ required: true }}
        options={[
          {
            value: '8 CPU Cores / 64 GB RAM / 120 GB NvME storage / 8 TB Data Transfer',
            label: '8 CPU Cores / 64 GB RAM / 120 GB NvME storage / 8 TB Data Transfer',
          },
        ]}
      />
      <NumberInput
        style={{ width: '136px' }}
        label="Number of nodes"
        onIncrease={() => setValue((curVal) => curVal + 1)}
        onDecrease={() => setValue((curVal) => (curVal === minNodeCount ? curVal : curVal - 1))}
        inputProps={{
          value,
          type: 'number',
          ...register('nodeCount', { required: true }),
          required: true,
          min: minNodeCount,
        }}
      />

      {/* TODO: ADD Advanced options */}
    </>
  );
};

export default FinalForm;
