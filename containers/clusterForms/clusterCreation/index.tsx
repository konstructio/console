import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';

import ControlledAutocomplete from '../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { getCloudDomains } from '../../../redux/thunks/api.thunk';
import ControlledSelect from '../../../components/controlledFields/Select';
import Typography from '../../../components/typography';
import { ClusterType, NewWorkloadClusterConfig } from '../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../constants/colors';
import ControlledNumberInput from '../../../components/controlledFields/numberInput';

import AdvancedOptions from './advancedOptions';
import { AdvancedOptionsButton, Container } from './clusterCreation.styled';
import ControlledRadioGroup from '../../../components/controlledFields/radio';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

const minNodeCount = 3;

const ClusterCreationForm: FunctionComponent<ComponentPropsWithoutRef<'div'>> = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useAppDispatch();

  const { cloudDomains, cloudRegions } = useAppSelector(({ api, installation }) => ({
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

  const { control, getValues } = useFormContext<NewWorkloadClusterConfig>();

  const { clusterName, cloudRegion, instanceSize, nodeCount, type } = getValues();

  return (
    <Container {...props}>
      <ControlledTextField
        control={control}
        name="clusterName"
        defaultValue={clusterName}
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
        defaultValue={cloudRegion}
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
        defaultValue={instanceSize}
      />
      <Box sx={{ width: 136 }}>
        <ControlledNumberInput
          label="Number of nodes"
          control={control}
          name="nodeCount"
          defaultValue={3}
          numberInputProps={{ min: minNodeCount }}
        />
      </Box>
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          Cluster type
        </Typography>
        <ControlledRadioGroup
          control={control}
          name="type"
          rules={{
            required: false,
          }}
          options={[
            { label: 'Workload cluster', value: ClusterType.WORKLOAD },
            { label: 'Workload virtual cluster', value: ClusterType.WORKLOAD_V_CLUSTER },
          ]}
          defaultValue={type}
        />
      </InputContainer>
    </Container>
  );
};

export default ClusterCreationForm;
