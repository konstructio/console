import React, { FunctionComponent, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ClickAwayListener } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { CloseButton, Form, FormContent, Menu, MenuHeader } from './createClusterFlow.styled';

import Button from '@/components/button';
import { FIRE_BRICK, SALTBOX_BLUE } from '@/constants/colors';
import ClusterCreationForm from '@/containers/clusterForms/clusterCreation';
import ClusterDetails from '@/components/clusterDetails';
import {
  Cluster,
  ClusterCreationStep,
  ClusterStatus,
  DraftCluster,
  ManagementCluster,
  NewWorkloadClusterConfig,
} from '@/types/provision';
import HeadsUpNotification from '@/components/headsUpNotification';
import { RESERVED_DRAFT_CLUSTER_NAME } from '@/constants';
import useToggle from '@/hooks/useToggle';
import Row from '@/components/row';
import Typography from '@/components/typography';

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
  const { isOpen, close, toggle } = useToggle();

  const methods = useForm<NewWorkloadClusterConfig>({
    defaultValues,
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
    !isValid ||
    loading ||
    (cluster?.clusterId !== RESERVED_DRAFT_CLUSTER_NAME &&
      cluster?.status === ClusterStatus.PROVISIONING);

  const showingClusterDetails = clusterCreationStep === ClusterCreationStep.DETAILS;

  const showHeadsUpNotification =
    !notifiedOfBetaPhysicalClusters && clusterCreationStep === ClusterCreationStep.CONFIG;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MenuHeader>
          <CloseButton onClick={onMenuClose} type="button">
            <CloseIcon htmlColor={SALTBOX_BLUE} />
          </CloseButton>
          {!showingClusterDetails ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              disabled={submitButtonDisabled}
              type="submit"
              data-test-id="workload-cluster-create-details"
            >
              Create cluster
            </Button>
          ) : (
            <Row>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                data-test-id="workload-cluster-edit"
                onClick={toggle}
              >
                <MoreHoriz />
              </Button>
              {isOpen && (
                <ClickAwayListener onClickAway={close}>
                  <Menu>
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton onClick={onClusterDelete}>
                          <Typography variant="body2" style={{ color: `${FIRE_BRICK}` }}>
                            Delete cluster
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Menu>
                </ClickAwayListener>
              )}
            </Row>
          )}
        </MenuHeader>
        <FormContent>
          {showHeadsUpNotification && <HeadsUpNotification onClose={onNotificationClose} />}
          {!showingClusterDetails && <ClusterCreationForm style={{ flex: 1, margin: '32px 0' }} />}
          {showingClusterDetails && cluster && (
            <ClusterDetails
              cluster={cluster}
              host={managementCluster?.gitHost as string}
              gitOwner={managementCluster?.gitAuth.gitOwner}
              style={{ marginTop: '24px' }}
            />
          )}
        </FormContent>
      </Form>
    </FormProvider>
  );
};
