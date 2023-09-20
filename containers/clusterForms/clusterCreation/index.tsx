import React, { ComponentPropsWithoutRef, FunctionComponent, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';

import ControlledAutocomplete from '../../../components/controlledFields/AutoComplete';
import ControlledTextField from '../../../components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import ControlledSelect from '../../../components/controlledFields/Select';
import Typography from '../../../components/typography';
import {
  ClusterType,
  NewWorkloadClusterConfig,
  CLUSTER_ENVIRONMENTS,
  ClusterEnvironment,
} from '../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../constants/colors';
import ControlledNumberInput from '../../../components/controlledFields/numberInput';
import ControlledRadioGroup from '../../../components/controlledFields/radio';
import { LOWER_KEBAB_CASE_REGEX } from '../../../constants';
import { updateDraftCluster } from '../../../redux/slices/api.slice';

import { Container } from './clusterCreation.styled';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

const minNodeCount = 3;

const ClusterCreationForm: FunctionComponent<ComponentPropsWithoutRef<'div'>> = (props) => {
  const { cloudRegions, previouslyUsedClusterNames, draftCluster } = useAppSelector(
    ({ api }) => api,
  );

  const dispatch = useAppDispatch();

  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<NewWorkloadClusterConfig>();

  const { type } = getValues();

  const isVCluster = useMemo(() => type === ClusterType.WORKLOAD_V_CLUSTER, [type]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (draftCluster) {
        dispatch(updateDraftCluster({ ...draftCluster, ...values }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch, draftCluster]);

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
          defaultValue={draftCluster?.type}
          onChange={(clusterType) =>
            setValue('type', clusterType as ClusterType, { shouldValidate: true })
          }
        />
      </InputContainer>
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          Environment cluster will host
        </Typography>
        <ControlledRadioGroup
          control={control}
          name="environment"
          rules={{
            required: false,
          }}
          options={CLUSTER_ENVIRONMENTS.map((item) => ({ label: item, value: item }))}
          defaultValue={draftCluster?.environment}
          onChange={(env) => setValue('environment', env as ClusterEnvironment)}
        />
      </InputContainer>
      <ControlledTextField
        control={control}
        name="clusterName"
        defaultValue={draftCluster?.clusterName}
        label="Cluster name"
        rules={{
          maxLength: 25,
          required: true,
          pattern: {
            value: LOWER_KEBAB_CASE_REGEX,
            message: 'Please use lower kebab case for cluster name',
          },
          validate: {
            previouslyUsedClusterNames: (value) =>
              !previouslyUsedClusterNames.includes(value as string) ||
              'Please use a unique name that has not been previously provisioned',
          },
        }}
        onErrorText={errors.clusterName?.message}
        required
      />
      {!isVCluster && (
        <>
          <ControlledAutocomplete
            control={control}
            name="cloudRegion"
            label="Cloud region"
            defaultValue={draftCluster?.cloudRegion}
            required
            rules={{ required: true }}
            options={
              cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))
            }
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
            defaultValue={draftCluster?.instanceSize}
          />
        </>
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
