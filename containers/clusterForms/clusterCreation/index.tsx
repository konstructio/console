import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';

import ControlledAutocomplete from '../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../components/controlledFields/TextField';
import { useAppSelector } from '../../../redux/store';
import ControlledSelect from '../../../components/controlledFields/Select';
import Typography from '../../../components/typography';
import { ClusterType, NewWorkloadClusterConfig } from '../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../constants/colors';
import ControlledNumberInput from '../../../components/controlledFields/numberInput';
import ControlledRadioGroup from '../../../components/controlledFields/radio';

import { Container } from './clusterCreation.styled';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

const minNodeCount = 3;

const ClusterCreationForm: FunctionComponent<ComponentPropsWithoutRef<'div'>> = (props) => {
  const [selectedClusterType, setSelectedClusterType] = useState('');

  const { cloudRegions } = useAppSelector(({ api, installation }) => ({
    cloudDomains: api.cloudDomains,
    cloudRegions: api.cloudRegions,
    values: installation.values,
  }));

  const { control, getValues } = useFormContext<NewWorkloadClusterConfig>();

  const { clusterName, cloudRegion, instanceSize, type } = getValues();

  return (
    <Container {...props}>
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
            { label: 'Virtual', value: ClusterType.WORKLOAD_V_CLUSTER },
            { label: 'Physical', value: ClusterType.WORKLOAD },
          ]}
          defaultValue={type}
          onChange={(e) => setSelectedClusterType(e)}
          inLine
        />
      </InputContainer>
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
        options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
      />
      {selectedClusterType === ClusterType.WORKLOAD && (
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
      )}
      <Box sx={{ width: 136 }}>
        <ControlledNumberInput
          label="Number of nodes"
          control={control}
          name="nodeCount"
          defaultValue={3}
          numberInputProps={{ min: minNodeCount }}
        />
      </Box>
    </Container>
  );
};

export default ClusterCreationForm;
