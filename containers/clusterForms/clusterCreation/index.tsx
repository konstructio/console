import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';

import { Container } from './clusterCreation.styled';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

import ControlledAutocomplete from '@/components/controlledFields/AutoComplete';
import ControlledTextField from '@/components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import ControlledSelect from '@/components/controlledFields/Select';
import Typography from '@/components/typography';
import { ClusterType, NewWorkloadClusterConfig, ClusterEnvironment } from '@/types/provision';
import { EXCLUSIVE_PLUM } from '@/constants/colors';
import ControlledNumberInput from '@/components/controlledFields/numberInput';
import ControlledRadioGroup from '@/components/controlledFields/radio';
import { LOWER_KEBAB_CASE_REGEX, MIN_NODE_COUNT, WORKLOAD_CLUSTER_OPTIONS } from '@/constants';
import { updateDraftCluster } from '@/redux/slices/api.slice';
import ControlledEnvironmentSelect from '@/components/controlledFields/environmentSelect';
import Modal from '@/components/modal';
import useModal from '@/hooks/useModal';
import { EnvironmentMenu } from '@/components/environmentMenu';
import LearnMore from '@/components/learnMore';
import { createEnvironment } from '@/redux/thunks/environments.thunk';
import { noop } from '@/utils/noop';
import { clearEnvironmentError } from '@/redux/slices/environments.slice';
import { InstallationType } from '@/types/redux';
import useFeatureFlag from '@/hooks/useFeatureFlag';

const ClusterCreationForm: FunctionComponent<Omit<ComponentPropsWithoutRef<'div'>, 'key'>> = (
  props,
) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const { managementCluster, cloudRegions, clusterNameCache, clusterMap, environments, error } =
    useAppSelector(({ api, environments }) => ({ ...api, ...environments }));

  const { isEnabled: canProvisionAWSPhysicalClusters } = useFeatureFlag(
    'canProvisionAwsPhysicalClusters',
  );
  const { isEnabled: canProvisionGCPPhysicalClusters } = useFeatureFlag(
    'canProvisionGCPPhysicalClusters',
  );
  const { isEnabled: canProvisionDOPhysicalClusters } = useFeatureFlag(
    'canProvisionDOPhysicalClusters',
  );
  const { isEnabled: canProvisionVultrPhysicalClusters } = useFeatureFlag(
    'canProvisionVultrPhysicalClusters',
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

  const handleAddEnvironment = useCallback(
    (environment: ClusterEnvironment) => {
      setValue('environment', environment);
      dispatch(createEnvironment(environment))
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch(noop);
    },
    [dispatch, setValue, closeModal],
  );

  const clearEnvError = useCallback(() => {
    dispatch(clearEnvironmentError());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    clearEnvError();
    closeModal();
  }, [clearEnvError, closeModal]);

  const draftCluster = useMemo(() => clusterMap['draft'], [clusterMap]);

  const isVCluster = useMemo(() => type === ClusterType.WORKLOAD_V_CLUSTER, [type]);

  // check if user has permission to provision physical clusters based on cloud provider,
  // otherwise default to true if no feature flag check
  const physicalClustersPermission = useMemo(
    (): Record<InstallationType, boolean> => ({
      [InstallationType.AWS]: canProvisionAWSPhysicalClusters,
      [InstallationType.DIGITAL_OCEAN]: canProvisionDOPhysicalClusters,
      [InstallationType.GOOGLE]: canProvisionGCPPhysicalClusters,
      [InstallationType.VULTR]: canProvisionVultrPhysicalClusters,
      [InstallationType.CIVO]: true,
      [InstallationType.LOCAL]: true,
    }),
    [
      canProvisionAWSPhysicalClusters,
      canProvisionDOPhysicalClusters,
      canProvisionGCPPhysicalClusters,
      canProvisionVultrPhysicalClusters,
    ],
  );

  const clusterOptions = useMemo(() => {
    if (
      managementCluster &&
      managementCluster.cloudProvider &&
      physicalClustersPermission[managementCluster.cloudProvider]
    ) {
      return WORKLOAD_CLUSTER_OPTIONS;
    }
    return WORKLOAD_CLUSTER_OPTIONS.filter((option) => option.value !== ClusterType.WORKLOAD);
  }, [managementCluster, physicalClustersPermission]);

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
          options={clusterOptions}
          defaultValue={type}
          onChange={(clusterType) =>
            setValue('type', clusterType as ClusterType, { shouldValidate: true })
          }
        />
        <LearnMore
          href="#"
          description="A partitioned space in your management cluster."
          linkTitle="Learn More"
          withoutDivider
        />
      </InputContainer>
      <>
        <ControlledEnvironmentSelect
          control={control}
          name="environment"
          label="Environment cluster will host"
          onErrorText={errors.environment?.message}
          options={Object.values(environments)}
          onAddNewEnvironment={openModal}
        />
        <Modal
          padding={0}
          isOpen={isOpen}
          styleOverrides={{ width: '100%', maxWidth: '630px' }}
          onCloseModal={handleModalClose}
        >
          <EnvironmentMenu
            onSubmit={handleAddEnvironment}
            onClose={closeModal}
            previouslyCreatedEnvironments={environments}
            errorMessage={error}
            onErrorClose={clearEnvError}
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
              !clusterNameCache[value as string] ||
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
