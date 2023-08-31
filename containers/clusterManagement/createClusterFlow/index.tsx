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
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  Cluster,
  ClusterCreationStep,
  ClusterStatus,
  ClusterType,
  NewWorkloadClusterConfig,
} from '../../../types/provision';
import { createWorkloadCluster } from '../../../redux/thunks/api.thunk';
import { setClusterCreationStep } from '../../../redux/slices/api.slice';
import { mockClusterConfig } from '../../../tests/mocks/mockClusterConfig';

import { CloseButton, ClusterMenuFooter, Form, MenuHeader } from './createClusterFlow.styled';

const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

const actionButtonText: Record<ClusterCreationStep, string> = {
  [ClusterCreationStep.CONFIG]: 'Create cluster',
  [ClusterCreationStep.DETAILS]: 'Delete Cluster',
};

interface CreateClusterFlowProps {
  cluster?: Cluster;
  onClusterDelete: () => void;
  onMenuClose: () => void;
  onSubmit: (clusterId: string) => void;
}

export const CreateClusterFlow: FunctionComponent<CreateClusterFlowProps> = ({
  cluster,
  onClusterDelete,
  onMenuClose,
  onSubmit,
}) => {
  const { clusterCreationStep, loading } = useAppSelector(({ api }) => api);

  const dispatch = useAppDispatch();

  const methods = useForm<NewWorkloadClusterConfig>({
    defaultValues: isDevelopment ? mockClusterConfig : { type: ClusterType.WORKLOAD },
  });

  const handleMenuClose = useCallback(() => {
    if (clusterCreationStep !== ClusterCreationStep.DETAILS) {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    onMenuClose();
  }, [dispatch, clusterCreationStep, onMenuClose]);

  const handleClick = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.DETAILS) {
      onClusterDelete();
    }
  }, [onClusterDelete, clusterCreationStep]);

  const handleSubmit = useCallback(
    (config: NewWorkloadClusterConfig) => {
      if (clusterCreationStep !== ClusterCreationStep.DETAILS) {
        dispatch(createWorkloadCluster(config))
          .unwrap()
          .then((response) => {
            onSubmit(response.cluster_id);
            dispatch(setClusterCreationStep(clusterCreationStep + 1));
          });
      }
    },
    [clusterCreationStep, dispatch, onSubmit],
  );

  const showingClusterDetails = clusterCreationStep === ClusterCreationStep.DETAILS;

  const {
    formState: { isValid },
  } = methods;

  const submitButtonDisabled =
    !isValid ||
    loading ||
    (cluster?.type !== ClusterType.DRAFT && cluster?.status === ClusterStatus.PROVISIONING);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)}>
        <MenuHeader>
          <Typography variant="subtitle2">
            {showingClusterDetails ? cluster?.clusterName : 'Create workload cluster'}
          </Typography>
          <CloseButton onClick={handleMenuClose} type="button">
            <CloseIcon htmlColor={SALTBOX_BLUE} />
          </CloseButton>
        </MenuHeader>
        <Column style={{ flex: 1, padding: '0 24px', overflow: 'auto' }}>
          {clusterCreationStep === ClusterCreationStep.CONFIG && (
            <ClusterCreationForm style={{ flex: 1, margin: '32px 0' }} />
          )}
          {clusterCreationStep === ClusterCreationStep.DETAILS && cluster && (
            <ClusterDetails cluster={cluster} style={{ marginTop: '24px' }} />
          )}
        </Column>
        <ClusterMenuFooter reverseButtonOrder={showingClusterDetails}>
          <Button variant="outlined" color="primary" onClick={handleMenuClose} type="button">
            Close
          </Button>
          <Button
            variant="contained"
            color={showingClusterDetails ? 'error' : 'primary'}
            onClick={handleClick}
            disabled={submitButtonDisabled}
            type="submit"
          >
            {loading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
            {actionButtonText[clusterCreationStep]}
          </Button>
        </ClusterMenuFooter>
      </Form>
    </FormProvider>
  );
};
