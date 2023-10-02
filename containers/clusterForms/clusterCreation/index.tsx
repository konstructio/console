import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
  ClusterEnvironment,
} from '../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../constants/colors';
import ControlledNumberInput from '../../../components/controlledFields/numberInput';
import ControlledRadioGroup from '../../../components/controlledFields/radio';
import { LOWER_KEBAB_CASE_REGEX } from '../../../constants';
import { updateDraftCluster } from '../../../redux/slices/api.slice';
import ControlledEnvironmentSelect from '../../../components/controlledFields/environmentSelect';
import Modal from '../../../components/modal';
import useModal from '../../../hooks/useModal';
import { CreateEnvironmentMenu } from '../../../components/createEnvironmentMenu';

import { Container } from './clusterCreation.styled';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

const MIN_NODE_COUNT = 1;

const ClusterCreationForm: FunctionComponent<Omit<ComponentPropsWithoutRef<'div'>, 'key'>> = (
  props,
) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const [environments, setEnvironments] = useState<ClusterEnvironment[]>([
    {
      environmentName: 'development',
      description: 'Environment for development',
      labelColor: 'dark-sky-blue',
    },
    {
      environmentName: 'staging',
      description: 'Environment for staging',
      labelColor: 'yellow',
    },
    {
      environmentName: 'production',
      description: 'Environment for production',
      labelColor: 'green',
    },
  ]);

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

  const handleAddEnvironment = (environment: ClusterEnvironment) => {
    setEnvironments((curState) => [...curState, environment]);
    setValue('environment', environment);
    closeModal();
  };

  useEffect(() => {
    const subscription = watch((values) => {
      if (draftCluster) {
        dispatch(updateDraftCluster({ ...draftCluster, ...values }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch, draftCluster]);

  const isVCluster = useMemo(() => type === ClusterType.WORKLOAD_V_CLUSTER, [type]);

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
      <>
        <ControlledEnvironmentSelect
          control={control}
          name="environment"
          label="Environment cluster will host"
          onErrorText={errors.environment?.message}
          options={environments}
          onAddNewEnvironment={openModal}
        />
        <Modal
          padding={0}
          isOpen={isOpen}
          styleOverrides={{ width: '100%', maxWidth: '630px' }}
          onCloseModal={closeModal}
        >
          <CreateEnvironmentMenu
            onSubmit={handleAddEnvironment}
            onClose={closeModal}
            previouslyCreatedEnvironments={environments}
          />
        </Modal>
      </>
      <ControlledTextField
        control={control}
        name="clusterName"
        defaultValue={draftCluster?.clusterName}
        label="Cluster name"
        rules={{
          maxLength: 25,
          required: 'Cluster name is required',
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
          numberInputProps={{ min: MIN_NODE_COUNT }}
        />
      </Box>
    </Container>
  );
};

export default ClusterCreationForm;
