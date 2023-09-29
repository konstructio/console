import React, { FunctionComponent, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { FormProvider, useForm } from 'react-hook-form';

import Typography from '../../../components/typography';
import Button from '../../../components/button';
import { SALTBOX_BLUE } from '../../../constants/colors';
import Column from '../../../components/column';
import ClusterCreationForm from '../../../containers/clusterForms/clusterCreation';
import ClusterDetails from '../../../components/clusterDetails';
import {
  Cluster,
  ClusterCreationStep,
  ClusterStatus,
  ManagementCluster,
  NewWorkloadClusterConfig,
} from '../../../types/provision';

import { CloseButton, ClusterMenuFooter, Form, MenuHeader } from './createClusterFlow.styled';

const actionButtonText: Record<ClusterCreationStep, string> = {
  [ClusterCreationStep.CONFIG]: 'Create cluster',
  [ClusterCreationStep.DETAILS]: 'Delete cluster',
};

interface CreateClusterFlowProps {
  cluster?: Cluster;
  managementCluster?: ManagementCluster;
  onClusterDelete: () => void;
  onMenuClose: () => void;
  onSubmit: () => void;
  clusterCreationStep: ClusterCreationStep;
  defaultValues?: NewWorkloadClusterConfig;
  loading: boolean;
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
}) => {
  const methods = useForm<NewWorkloadClusterConfig>({
    defaultValues,
    mode: 'onChange',
  });

  const handleClick = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.DETAILS) {
      onClusterDelete();
    }
  }, [onClusterDelete, clusterCreationStep]);

  const showingClusterDetails = clusterCreationStep === ClusterCreationStep.DETAILS;

  const {
    formState: { isValid },
  } = methods;

  const submitButtonDisabled =
    !isValid || loading || cluster?.status === ClusterStatus.PROVISIONING;

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
        <Column style={{ flex: 1, padding: '0 24px', overflow: 'auto' }}>
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
        </Column>
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
