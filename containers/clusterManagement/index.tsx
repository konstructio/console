'use client';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { CreateClusterFlow } from './createClusterFlow';
import {
  Container,
  Content,
  Header,
  LeftContainer,
  StyledDrawer,
} from './clusterManagement.styled';

import Button from '@/components/button';
import Typography from '@/components/typography';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createWorkloadCluster, deleteCluster } from '@/redux/thunks/api.thunk';
import {
  ClusterCreationStep,
  ClusterStatus,
  ClusterType,
  WorkloadCluster,
} from '@/types/provision';
import useToggle from '@/hooks/useToggle';
import useModal from '@/hooks/useModal';
import DeleteCluster from '@/components/deleteCluster';
import TabPanel, { Tab, a11yProps } from '@/components/tab';
import { BISCAY, SALTBOX_BLUE } from '@/constants/colors';
import { Flow } from '@/components/flow';
import ClusterTable from '@/components/clusterTable/clusterTable';
import {
  createDraftCluster,
  removeDraftCluster,
  setClusterCreationStep,
} from '@/redux/slices/api.slice';
import { setPresentedClusterName } from '@/redux/slices/api.slice';
import { setNotifiedOfBetaPhysicalClusters } from '@/redux/slices/notifications.slice';
import { usePhysicalClustersPermissions } from '@/hooks/usePhysicalClustersPermission';
import { InstallationType } from '@/types/redux';
import { setClusterManagamentTab } from '@/redux/slices/config.slice';
import { ClusterManagementTab } from '@/types/config';
import {
  DEFAULT_CLOUD_INSTANCE_SIZES,
  RESERVED_DRAFT_CLUSTER_NAME,
  SUGGESTED_WORKLOAD_NODE_COUNT,
} from '@/constants';

const ClusterManagement: FunctionComponent = () => {
  const {
    managementCluster,
    clusterCreationStep,
    presentedClusterName,
    loading,
    notifiedOfBetaPhysicalClusters,
    clusterMap,
    clusterManagementTab,
  } = useAppSelector(({ api, queue, notifications, config, featureFlags }) => ({
    clusterQueue: queue.clusterQueue,
    notifiedOfBetaPhysicalClusters: notifications.notifiedOfBetaPhysicalClusters,
    clusterManagementTab: config.clusterManagementTab,
    ...api,
    ...featureFlags.flags,
  }));

  const dispatch = useAppDispatch();

  const { hasPermissions } = usePhysicalClustersPermissions(managementCluster?.cloudProvider);

  const defaultClusterType = useMemo(() => {
    if (managementCluster && managementCluster.cloudProvider && hasPermissions) {
      return ClusterType.WORKLOAD;
    }
    return ClusterType.WORKLOAD_V_CLUSTER;
  }, [managementCluster, hasPermissions]);

  const tabColor = useMemo(
    () => (clusterManagementTab === ClusterManagementTab.LIST_VIEW ? BISCAY : SALTBOX_BLUE),
    [clusterManagementTab],
  );

  const { instanceSize } =
    DEFAULT_CLOUD_INSTANCE_SIZES[managementCluster?.cloudProvider ?? InstallationType.LOCAL];

  const presentedCluster = useMemo(
    () => clusterMap[presentedClusterName ?? ''],
    [clusterMap, presentedClusterName],
  );

  const {
    isOpen: createClusterFlowOpen,
    open: openCreateClusterFlow,
    close: closeCreateClusterFlow,
  } = useToggle();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleMenuClose = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG) {
      dispatch(removeDraftCluster());
    } else {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    dispatch(setPresentedClusterName(undefined));
    closeCreateClusterFlow();
  }, [clusterCreationStep, dispatch, closeCreateClusterFlow]);

  const handleDeleteCluster = useCallback(() => {
    if (presentedClusterName) {
      dispatch(deleteCluster(presentedClusterName))
        .unwrap()
        .then(() => {
          closeDeleteModal();
          handleMenuClose();
        });
    }
  }, [dispatch, presentedClusterName, closeDeleteModal, handleMenuClose]);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, tabIndex: number) => {
      dispatch(setClusterManagamentTab(tabIndex));
      if (presentedClusterName) {
        dispatch(setPresentedClusterName(undefined));
      }
    },
    [dispatch, presentedClusterName],
  );

  const handleClusterSelect = useCallback(
    (clusterName: string) => {
      dispatch(setPresentedClusterName(clusterName));
      dispatch(setClusterCreationStep(ClusterCreationStep.DETAILS));
      openCreateClusterFlow();
    },
    [dispatch, openCreateClusterFlow],
  );

  const handleAddWorkloadCluster = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG && managementCluster) {
      const {
        gitProvider,
        cloudProvider,
        domainName,
        adminEmail,
        gitAuth,
        dnsProvider,
        cloudRegion,
      } = managementCluster;

      const draftCluster: WorkloadCluster = {
        clusterId: RESERVED_DRAFT_CLUSTER_NAME,
        clusterName: RESERVED_DRAFT_CLUSTER_NAME,
        status: ClusterStatus.PROVISIONING,
        type: defaultClusterType,
        nodeCount: SUGGESTED_WORKLOAD_NODE_COUNT,
        cloudProvider,
        cloudRegion,
        gitProvider,
        domainName,
        gitAuth,
        adminEmail,
        dnsProvider,
      };

      dispatch(createDraftCluster(draftCluster));
    }
    openCreateClusterFlow();
  }, [managementCluster, dispatch, openCreateClusterFlow, clusterCreationStep, defaultClusterType]);

  const handleCreateCluster = () => {
    if (clusterCreationStep !== ClusterCreationStep.DETAILS) {
      dispatch(createWorkloadCluster());
    }
  };

  const handleNotificationClose = useCallback(() => {
    dispatch(setNotifiedOfBetaPhysicalClusters(true));
  }, [dispatch]);

  const handleDeleteMenuClick = useCallback(
    (clusterName: string) => {
      dispatch(setPresentedClusterName(clusterName));
      openDeleteModal();
    },
    [dispatch, openDeleteModal],
  );

  return (
    <Container>
      <Header>
        <LeftContainer>
          <Typography variant="subtitle1">Clusters</Typography>
          <Box>
            <Tabs value={clusterManagementTab} onChange={handleChange} indicatorColor="primary">
              <Tab
                color={tabColor}
                label={<Typography variant="buttonSmall">Graph view</Typography>}
                {...a11yProps(ClusterManagementTab.GRAPH_VIEW)}
                sx={{ textTransform: 'initial', marginRight: '24px' }}
              />
              <Tab
                color={tabColor}
                label={<Typography variant="buttonSmall">List view</Typography>}
                {...a11yProps(ClusterManagementTab.LIST_VIEW)}
                sx={{ textTransform: 'initial', marginRight: 0 }}
              />
            </Tabs>
          </Box>
        </LeftContainer>

        <Button
          color="primary"
          variant="contained"
          onClick={handleAddWorkloadCluster}
          data-test-id="add-workload-cluster"
          sx={{ marginRight: '24px' }}
        >
          Add workload cluster
        </Button>
      </Header>
      <Content>
        <TabPanel value={clusterManagementTab} index={ClusterManagementTab.LIST_VIEW}>
          {managementCluster && (
            <ClusterTable
              clusters={clusterMap}
              managementCluster={managementCluster}
              onDeleteCluster={handleDeleteMenuClick}
              selectedClusterName={presentedCluster?.clusterName}
              onClusterRowSelected={handleClusterSelect}
            />
          )}
        </TabPanel>
        <TabPanel value={clusterManagementTab} index={ClusterManagementTab.GRAPH_VIEW}>
          <Flow onNodeClick={handleClusterSelect} />
        </TabPanel>
      </Content>
      <StyledDrawer open={createClusterFlowOpen} onClose={handleMenuClose} anchor="right">
        <CreateClusterFlow
          cluster={presentedCluster}
          managementCluster={managementCluster}
          clusterCreationStep={clusterCreationStep}
          onMenuClose={handleMenuClose}
          onClusterDelete={openDeleteModal}
          onSubmit={handleCreateCluster}
          defaultValues={{
            type: defaultClusterType,
            nodeCount: SUGGESTED_WORKLOAD_NODE_COUNT,
            instanceSize,
          }}
          loading={loading}
          notifiedOfBetaPhysicalClusters={notifiedOfBetaPhysicalClusters}
          onNotificationClose={handleNotificationClose}
        />
      </StyledDrawer>
      {!!presentedCluster && (
        <DeleteCluster
          isOpen={isDeleteModalOpen}
          onCloseModal={closeDeleteModal}
          onDelete={handleDeleteCluster}
          cluster={presentedCluster}
        />
      )}
    </Container>
  );
};

export default ClusterManagement;
