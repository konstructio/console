import React, { FunctionComponent, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';

import Typography from '../../../components/typography';
import Button from '../../../components/button';
import { SALTBOX_BLUE } from '../../../constants/colors';
import Column from '../../../components/column';
import LinearProgress from '../../../components/linearProgress';
import ClusterCreationForm from '../../../containers/clusterForms/clusterCreation';
import TerminalLogs from '../../../containers/terminalLogs';
import ClusterDetails from '../../../components/clusterDetails';
import { ClusterInfo } from '../../../components/clusterTable/clusterTable';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ClusterCreationStep, NewClusterConfig } from '../../../types/provision';
import { createWorkloadCluster } from '../../../redux/thunks/api.thunk';
import { setClusterCreationStep } from '../../../redux/slices/api.slice';

import { CloseButton, ClusterMenuFooter, Form, MenuHeader } from './createClusterFlow.styled';

const actionButtonText: Record<ClusterCreationStep, string> = {
  [ClusterCreationStep.CONFIG]: 'Create cluster',
  [ClusterCreationStep.PROVISION]: 'View cluster details',
  [ClusterCreationStep.DETAILS]: 'Delete Cluster',
};

interface CreateClusterFlowProps {
  onMenuClose: () => void;
  cluster?: ClusterInfo;
}

export const CreateClusterFlow: FunctionComponent<CreateClusterFlowProps> = ({
  cluster,
  onMenuClose,
}) => {
  const { clusterCreationStep } = useAppSelector(({ api }) => api);

  const dispatch = useAppDispatch();

  const methods = useForm<NewClusterConfig>();

  const handleMenuClose = useCallback(() => {
    // if provisioning, keep menu on provisioning step
    if (clusterCreationStep !== ClusterCreationStep.PROVISION) {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    onMenuClose();
  }, [dispatch, clusterCreationStep, onMenuClose]);

  const handleClick = useCallback(() => {
    if (clusterCreationStep !== ClusterCreationStep.DETAILS && methods.formState.isValid) {
      dispatch(setClusterCreationStep(clusterCreationStep + 1));
    }
  }, [dispatch, clusterCreationStep, methods]);

  const handleSubmit = useCallback(
    (config: NewClusterConfig) => {
      dispatch(createWorkloadCluster(config));
    },
    [dispatch],
  );

  const showingClusterDetails = clusterCreationStep === ClusterCreationStep.DETAILS;

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
          {clusterCreationStep === ClusterCreationStep.PROVISION && (
            <Column style={{ gap: '32px' }}>
              <LinearProgress progress={80} />
              <TerminalLogs />
            </Column>
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
            type="submit"
          >
            {actionButtonText[clusterCreationStep]}
          </Button>
        </ClusterMenuFooter>
      </Form>
    </FormProvider>
  );
};
