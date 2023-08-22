import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ControlledAutocomplete from '../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { getCloudDomains } from '../../../redux/thunks/api.thunk';
import ControlledSelect from '../../../components/controlledFields/Select';
import Typography from '../../../components/typography';
import { NewClusterConfig } from '../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../constants/colors';
import ControlledNumberInput from '../../../components/controlledFields/numberInput';

import AdvancedOptions from './advancedOptions';
import { AdvancedOptionsButton, Container } from './clusterCreation.styled';

const minNodeCount = 3;

const ClusterCreationForm: FunctionComponent<ComponentPropsWithoutRef<'div'>> = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useAppDispatch();

  const { cloudDomains, cloudRegions, values } = useAppSelector(({ api, installation }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
    values: installation.values,
  }));

  const handleRegionOnSelect = async (region: string) => {
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

  const { control } = useFormContext<NewClusterConfig>();

  return (
    <Container {...props}>
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
      <ControlledTextField
        control={control}
        name="environment"
        label="Environment"
        rules={{
          required: true,
        }}
        required
      />
      <ControlledAutocomplete
        control={control}
        name="cloudRegion"
        label="Cloud region"
        defaultValue={values?.cloudRegion}
        required
        rules={{ required: true }}
        // options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
        options={[{ label: 'LON1', value: 'LON1' }]}
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
      <ControlledNumberInput
        label="Number of nodes"
        control={control}
        name="nodeCount"
        numberInputProps={{ min: minNodeCount }}
      />
      <AdvancedOptionsButton onClick={() => setShowOptions(!showOptions)} expanded={showOptions}>
        <KeyboardArrowDownIcon style={{ color: EXCLUSIVE_PLUM }} />
        <Typography variant="subtitle2">Advanced Options</Typography>
      </AdvancedOptionsButton>
      {showOptions && <AdvancedOptions />}
    </Container>
  );
};

export default ClusterCreationForm;
