import React, { FunctionComponent, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { FormProvider, useForm } from 'react-hook-form';

import Typography from '../../../components/typography';
import Button from '../../../components/button';
import { SALTBOX_BLUE } from '../../../constants/colors';
import ClusterCreationForm from '../../../containers/clusterForms/clusterCreation';
import ClusterDetails from '../../../components/clusterDetails';
import {
  Cluster,
  ClusterCreationStep,
  ClusterStatus,
  DraftCluster,
  ManagementCluster,
  NewWorkloadClusterConfig,
} from '../../../types/provision';
import HeadsUpNotification from '../../../components/headsUpNotification';

import {
  CloseButton,
  ClusterMenuFooter,
  Form,
  FormContent,
  MenuHeader,
} from './createClusterFlow.styled';

import { InstallationType } from '@/types/redux';
import { DEFAULT_CLOUD_INSTANCE_SIZES } from '@/constants';

const actionButtonText: Record<ClusterCreationStep, string> = {
  [ClusterCreationStep.CONFIG]: 'Create cluster',
  [ClusterCreationStep.DETAILS]: 'Delete cluster',
};

interface CreateClusterFlowProps {
  cluster?: Cluster | DraftCluster;
  managementCluster?: ManagementCluster;
  onClusterDelete: () => void;
  onMenuClose: () => void;
  onSubmit: () => void;
  clusterCreationStep: ClusterCreationStep;
  defaultValues?: NewWorkloadClusterConfig;
  loading: boolean;
  notifiedOfBetaPhysicalClusters: boolean;
  onNotificationClose: () => void;
}

export const CreateClusterFlow: FunctionComponent<CreateClusterFlowProps> = ({
  cluster,
  onClusterDelete,
  onMenuClose,
  onSubmit,
  clusterCreationStep,
  defaultValues,
  managementCluster,
  loading,
  notifiedOfBetaPhysicalClusters,
  onNotificationClose,
}) => {
  const { instanceSize } =
    DEFAULT_CLOUD_INSTANCE_SIZES[managementCluster?.cloudProvider ?? InstallationType.LOCAL];

  const methods = useForm<NewWorkloadClusterConfig>({
    defaultValues: {
      ...defaultValues,
      instanceSize,
    },
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const handleClick = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.DETAILS) {
      onClusterDelete();
    }
  }, [onClusterDelete, clusterCreationStep]);

  const submitButtonDisabled =
    !isValid || loading || cluster?.status === ClusterStatus.PROVISIONING;

  const showingClusterDetails = clusterCreationStep === ClusterCreationStep.DETAILS;

  const showHeadsUpNotification =
    !notifiedOfBetaPhysicalClusters && clusterCreationStep === ClusterCreationStep.CONFIG;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MenuHeader>
          <Typography variant="subtitle2" data-test-id="menu-title">
            {showingClusterDetails ? cluster?.clusterName : 'Create workload cluster'}
          </Typography>
          <CloseButton onClick={onMenuClose} type="button">
            <CloseIcon htmlColor={SALTBOX_BLUE} />
          </CloseButton>
        </MenuHeader>
        <FormContent>
          {showHeadsUpNotification && <HeadsUpNotification onClose={onNotificationClose} />}
          {clusterCreationStep === ClusterCreationStep.CONFIG && (
            <ClusterCreationForm style={{ flex: 1, margin: '32px 0' }} />
          )}
          {clusterCreationStep === ClusterCreationStep.DETAILS && cluster && (
            <ClusterDetails
              cluster={cluster}
              host={managementCluster?.gitHost as string}
              gitOwner={managementCluster?.gitAuth.gitOwner}
              style={{ marginTop: '24px' }}
            />
          )}
        </FormContent>
        <ClusterMenuFooter reverseButtonOrder={showingClusterDetails}>
          <Button variant="outlined" color="primary" onClick={onMenuClose} type="button">
            Close
          </Button>
          <Button
            variant="contained"
            color={showingClusterDetails ? 'error' : 'primary'}
            onClick={handleClick}
            disabled={submitButtonDisabled}
            type="submit"
            data-test-id="workload-cluster-create-details"
          >
            {loading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
            {actionButtonText[clusterCreationStep]}
          </Button>
        </ClusterMenuFooter>
      </Form>
    </FormProvider>
  );
};
