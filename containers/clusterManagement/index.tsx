'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import Button from '../../components/button';
import Typography from '../../components/typography';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  createWorkloadCluster,
  deleteCluster,
  getCloudRegions,
  getClusters,
} from '../../redux/thunks/api.thunk';
import { Cluster, ClusterCreationStep, ClusterStatus, ClusterType } from '../../types/provision';
import useToggle from '../../hooks/useToggle';
import useModal from '../../hooks/useModal';
import DeleteCluster from '../../components/deleteCluster';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';
import { Flow } from '../../components/flow';
import ClusterTable from '../../components/clusterTable/clusterTable';
import {
  createDraftCluster,
  removeDraftCluster,
  setClusterCreationStep,
} from '../../redux/slices/api.slice';
import { setPresentedClusterId } from '../../redux/slices/api.slice';
import { useQueue } from '../../hooks/useQueue';
import { setNotifiedOfBetaPhysicalClusters } from '../../redux/slices/notifications.slice';
import { getAllEnvironments } from '../../redux/thunks/environments.thunk';

import { CreateClusterFlow } from './createClusterFlow';
import { Container, Content, Header, StyledDrawer } from './clusterManagement.styled';

import { InstallationType } from '@/types/redux';
import useFeatureFlag from '@/hooks/useFeatureFlag';
import { removeClusterFromQueue } from '@/redux/slices/queue.slice';
import { setClusterManagamentTab } from '@/redux/slices/config.slice';
import { ClusterManagementTab } from '@/types/config';

const ClusterManagement: FunctionComponent = () => {
  const {
    clusterQueue,
    managementCluster,
    clusterCreationStep,
    presentedClusterId,
    loading,
    notifiedOfBetaPhysicalClusters,
    clusterMap,
    clusterManagementTab,
  } = useAppSelector(({ api, queue, notifications, config }) => ({
    clusterQueue: queue.clusterQueue,
    notifiedOfBetaPhysicalClusters: notifications.notifiedOfBetaPhysicalClusters,
    clusterManagementTab: config.clusterManagementTab,
    ...api,
  }));

  const { addClusterToQueue } = useQueue();

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

  const defaultClusterType = useMemo(() => {
    if (
      managementCluster &&
      managementCluster.cloudProvider &&
      physicalClustersPermission[managementCluster.cloudProvider]
    ) {
      return ClusterType.WORKLOAD;
    }
    return ClusterType.WORKLOAD_V_CLUSTER;
  }, [managementCluster, physicalClustersPermission]);

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

  const dispatch = useAppDispatch();

  const handleGetClusters = useCallback(async (): Promise<void> => {
    await dispatch(getClusters());
  }, [dispatch]);

  const handleMenuClose = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG) {
      dispatch(removeDraftCluster());
    } else {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    dispatch(setPresentedClusterId(undefined));
    closeCreateClusterFlow();
  }, [clusterCreationStep, dispatch, closeCreateClusterFlow]);

  const handleDeleteCluster = () => {
    if (presentedClusterId) {
      dispatch(deleteCluster(presentedClusterId))
        .unwrap()
        .then(() => {
          addClusterToQueue({
            id: presentedClusterId,
            clusterName: managementCluster?.clusterName as string,
            status: ClusterStatus.DELETING,
            clusterType: ClusterType.WORKLOAD,
            callback: handleGetClusters,
          });
          closeDeleteModal();
          handleMenuClose();
        });
    }
  };

  const handleChange = useCallback(
    (event: React.SyntheticEvent, tabIndex: number) => {
      dispatch(setClusterManagamentTab(tabIndex));
      if (presentedClusterId) {
        dispatch(setPresentedClusterId(undefined));
      }
    },
    [dispatch, presentedClusterId],
  );

  const handleNodeClick = useCallback(
    (cluster: Cluster) => {
      dispatch(setPresentedClusterId(cluster.clusterId));
      dispatch(setClusterCreationStep(ClusterCreationStep.DETAILS));
      openCreateClusterFlow();
    },
    [dispatch, openCreateClusterFlow],
  );

  const handleAddWorkloadCluster = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG && managementCluster) {
      dispatch(createDraftCluster());
    }
    openCreateClusterFlow();
  }, [managementCluster, dispatch, openCreateClusterFlow, clusterCreationStep]);

  const handleCreateCluster = () => {
    if (clusterCreationStep !== ClusterCreationStep.DETAILS) {
      dispatch(createWorkloadCluster())
        .unwrap()
        .then((response) => {
          addClusterToQueue({
            id: response.clusterId,
            clusterName: managementCluster?.clusterName as string,
            clusterType: ClusterType.WORKLOAD,
            status: ClusterStatus.PROVISIONING,
            callback: handleGetClusters,
          });
          dispatch(setClusterCreationStep(clusterCreationStep + 1));
        });
    }
  };

  const handleNotificationClose = useCallback(() => {
    dispatch(setNotifiedOfBetaPhysicalClusters(true));
  }, [dispatch]);

  const handleDeleteMenuClick = useCallback(
    (id: string) => {
      dispatch(setPresentedClusterId(id));
      openDeleteModal();
    },
    [dispatch, openDeleteModal],
  );

  const tabColor = useMemo(
    () => (clusterManagementTab === ClusterManagementTab.LIST_VIEW ? BISCAY : SALTBOX_BLUE),
    [clusterManagementTab],
  );

  useEffect(() => {
    dispatch(getAllEnvironments());
  }, [dispatch]);

  useEffect(() => {
    if (managementCluster) {
      dispatch(getCloudRegions(managementCluster));
    }
  }, [dispatch, managementCluster]);

  useEffect(() => {
    const deletedClusters = Object.values(clusterQueue).filter(
      (cluster) => cluster.status === ClusterStatus.DELETED,
    );
    if (deletedClusters.length) {
      deletedClusters.forEach((cluster) => dispatch(removeClusterFromQueue(cluster.id)));
    }
  }, [clusterQueue, dispatch]);

  return (
    <Container>
      <Header>
        <Box sx={{ width: 'fit-content', marginLeft: '39px' }}>
          <Tabs value={clusterManagementTab} onChange={handleChange} indicatorColor="primary">
            <Tab
              color={tabColor}
              label={<Typography variant="buttonSmall">List view</Typography>}
              {...a11yProps(ClusterManagementTab.LIST_VIEW)}
              sx={{ textTransform: 'initial', mr: 3 }}
            />

            <Tab
              color={tabColor}
              label={<Typography variant="buttonSmall">Graph view</Typography>}
              {...a11yProps(ClusterManagementTab.GRAPH_VIEW)}
              sx={{ textTransform: 'initial' }}
            />
          </Tabs>
        </Box>
        <Button
          color="primary"
          variant="contained"
          style={{ marginRight: '24px' }}
          onClick={handleAddWorkloadCluster}
          data-test-id="add-workload-cluster"
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
            />
          )}
        </TabPanel>
        <TabPanel value={clusterManagementTab} index={ClusterManagementTab.GRAPH_VIEW}>
          <Flow onNodeClick={handleNodeClick} />
        </TabPanel>
      </Content>
      <StyledDrawer open={createClusterFlowOpen} onClose={handleMenuClose} anchor="right">
        <CreateClusterFlow
          cluster={clusterMap[presentedClusterId ?? '']}
          managementCluster={managementCluster}
          clusterCreationStep={clusterCreationStep}
          onMenuClose={handleMenuClose}
          onClusterDelete={openDeleteModal}
          onSubmit={handleCreateCluster}
          defaultValues={{ type: defaultClusterType }}
          loading={loading}
          notifiedOfBetaPhysicalClusters={notifiedOfBetaPhysicalClusters}
          onNotificationClose={handleNotificationClose}
        />
      </StyledDrawer>
      {presentedClusterId && (
        <DeleteCluster
          isOpen={isDeleteModalOpen}
          onCloseModal={closeDeleteModal}
          onDelete={handleDeleteCluster}
          cluster={clusterMap[presentedClusterId]}
        />
      )}
    </Container>
  );
};

export default ClusterManagement;
