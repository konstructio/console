import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';

import Typography from '../../../components/typography';
import Button from '../../../components/button';
import { SALTBOX_BLUE } from '../../../constants/colors';
import Column from '../../../components/column';
import LinearProgress from '../../../components/linearProgress';
import ClusterCreationForm, {
  ClusterConfig,
} from '../../../containers/clusterForms/clusterCreation';
import TerminalLogs from '../../../containers/terminalLogs';
import ClusterDetails from '../../../components/clusterDetails';
import { ClusterInfo } from '../../../components/clusterTable/clusterTable';

import { CloseButton, ClusterMenuFooter, MenuHeader } from './createClusterFlow.styled';

enum CLUSTER_MANAGEMENT_STEP {
  CREATE,
  PROVISION,
  DETAILS,
}

const actionButtonText: Record<CLUSTER_MANAGEMENT_STEP, string> = {
  [CLUSTER_MANAGEMENT_STEP.CREATE]: 'Create cluster',
  [CLUSTER_MANAGEMENT_STEP.PROVISION]: 'View cluster details',
  [CLUSTER_MANAGEMENT_STEP.DETAILS]: 'Delete Cluster',
};

interface CreateClusterFlowProps {
  onMenuClose: () => void;
  cluster?: ClusterInfo;
}

export const CreateClusterFlow: FunctionComponent<CreateClusterFlowProps> = ({
  cluster,
  onMenuClose,
}) => {
  const [workloadClusterStep, setWorkloadClusterStep] = useState<CLUSTER_MANAGEMENT_STEP>(
    CLUSTER_MANAGEMENT_STEP.CREATE,
  );

  const methods = useForm<ClusterConfig>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleMenuClose = useCallback(() => {
    onMenuClose();
    setWorkloadClusterStep((curStep) =>
      curStep === CLUSTER_MANAGEMENT_STEP.PROVISION ? curStep : CLUSTER_MANAGEMENT_STEP.CREATE,
    );
  }, [onMenuClose, setWorkloadClusterStep]);

  const handleClick = useCallback(() => {
    setWorkloadClusterStep((curStep) =>
      curStep === CLUSTER_MANAGEMENT_STEP.DETAILS ? curStep : curStep + 1,
    );
  }, [setWorkloadClusterStep]);

  const showingClusterDetails = workloadClusterStep === CLUSTER_MANAGEMENT_STEP.DETAILS;

  return (
    <>
      <MenuHeader>
        <Typography variant="subtitle2">
          {showingClusterDetails ? cluster?.clusterName : 'Create workload cluster'}
        </Typography>
        <CloseButton onClick={handleMenuClose}>
          <CloseIcon htmlColor={SALTBOX_BLUE} />
        </CloseButton>
      </MenuHeader>
      <Column style={{ flex: 1, padding: '0 24px' }}>
        {workloadClusterStep === CLUSTER_MANAGEMENT_STEP.CREATE && (
          <FormProvider {...methods}>
            <ClusterCreationForm
              onFormSubmit={(config) => console.log('the values =>', config)}
              ref={formRef}
              style={{ height: '100%', marginTop: '32px' }}
            />
          </FormProvider>
        )}
        {workloadClusterStep === CLUSTER_MANAGEMENT_STEP.PROVISION && (
          <Column style={{ gap: '32px' }}>
            <LinearProgress progress={80} />
            <TerminalLogs />
          </Column>
        )}
        {workloadClusterStep === CLUSTER_MANAGEMENT_STEP.DETAILS && cluster && (
          <ClusterDetails cluster={cluster} style={{ marginTop: '24px' }} />
        )}
      </Column>
      <ClusterMenuFooter reverseButtonOrder={showingClusterDetails}>
        <Button variant="outlined" color="primary" onClick={handleMenuClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color={showingClusterDetails ? 'error' : 'primary'}
          onClick={handleClick}
        >
          {actionButtonText[workloadClusterStep]}
        </Button>
      </ClusterMenuFooter>
    </>
  );
};
