import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Box, Tabs } from '@mui/material';

import Button from '../../components/button';
import Typography from '../../components/typography';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getCloudRegions, getClusters } from '../../redux/thunks/api.thunk';
import { Cluster, ClusterCreationStep, ClusterStatus, ClusterType } from '../../types/provision';
import useToggle from '../../hooks/useToggle';
import Drawer from '../../components/drawer';
import useModal from '../../hooks/useModal';
import DeleteCluster from '../deleteCluster';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';
import { Flow } from '../../components/flow';
import { ClusterTable } from '../../components/clusterTable/clusterTable';
import {
  createDraftCluster,
  removeDraftCluster,
  setClusterCreationStep,
} from '../../redux/slices/api.slice';
import { setPresentedCluster } from '../../redux/slices/api.slice';
import { useQueue } from '../../hooks/useQueue';
import { InstallationType } from '../../types/redux';

import { CreateClusterFlow } from './createClusterFlow';
import { Container, Content, Header } from './clusterManagement.styled';

enum MANAGEMENT_TABS {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}

const ClusterManagement: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(MANAGEMENT_TABS.LIST_VIEW);

  const { managementCluster, draftCluster, clusterCreationStep, presentedCluster } = useAppSelector(
    ({ api, queue }) => ({
      clusterQueue: queue.clusterQueue,
      ...api,
    }),
  );

  const { addClusterToQueue } = useQueue();

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
    dispatch(setPresentedCluster(undefined));
    closeCreateClusterFlow();
  }, [clusterCreationStep, dispatch, closeCreateClusterFlow]);

  const handleDeleteCluster = useCallback(async () => {
    if (presentedCluster) {
      await dispatch(deleteCluster(presentedCluster?.id)).unwrap();
      addClusterToQueue({
        id: presentedCluster?.id,
        clusterName: managementCluster?.clusterName as string,
        status: ClusterStatus.DELETING,
        clusterType: ClusterType.WORKLOAD,
        callback: handleGetClusters,
      });

      closeDeleteModal();
      handleMenuClose();
    }
  }, [
    presentedCluster,
    dispatch,
    handleGetClusters,
    addClusterToQueue,
    managementCluster?.clusterName,
    closeDeleteModal,
    handleMenuClose,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleNodeClick = useCallback(
    (cluster: Cluster) => {
      dispatch(setPresentedCluster(cluster));
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

  const handleCreateCluster = (clusterId: string) => {
    if (managementCluster) {
      addClusterToQueue({
        id: clusterId,
        clusterName: managementCluster?.clusterName as string,
        clusterType: ClusterType.WORKLOAD,
        status: ClusterStatus.PROVISIONING,
        callback: handleGetClusters,
      });
    }
  };

  useEffect(() => {
    if (managementCluster) {
      dispatch(getCloudRegions(managementCluster));
    }
  }, [dispatch, managementCluster]);

  return (
    <Container>
      <Header>
        <Box sx={{ width: 'fit-content', marginLeft: '39px' }}>
          <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
            <Tab
              color={activeTab === MANAGEMENT_TABS.LIST_VIEW ? BISCAY : SALTBOX_BLUE}
              label={<Typography variant="buttonSmall">List view</Typography>}
              {...a11yProps(MANAGEMENT_TABS.LIST_VIEW)}
              sx={{ textTransform: 'initial', mr: 3 }}
            />

            <Tab
              color={activeTab === MANAGEMENT_TABS.GRAPH_VIEW ? BISCAY : SALTBOX_BLUE}
              label={<Typography variant="buttonSmall">Graph view</Typography>}
              {...a11yProps(MANAGEMENT_TABS.GRAPH_VIEW)}
              sx={{ textTransform: 'initial' }}
            />
          </Tabs>
        </Box>
        {managementCluster?.cloudProvider === InstallationType.CIVO && (
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: '24px' }}
            onClick={handleAddWorkloadCluster}
          >
            Add workload cluster
          </Button>
        )}
      </Header>
      <Content>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.LIST_VIEW}>
          {managementCluster && (
            <ClusterTable
              managementCluster={managementCluster}
              draftCluster={draftCluster}
              onDeleteCluster={openDeleteModal}
              onMenuOpenClose={(cluster) => dispatch(setPresentedCluster(cluster))}
              presentedClusterId={presentedCluster?.id}
            />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.GRAPH_VIEW}>
          <Flow onNodeClick={handleNodeClick} />
        </TabPanel>
      </Content>
      <Drawer
        open={createClusterFlowOpen}
        anchor="right"
        hideBackdrop
        PaperProps={{
          sx: {
            top: '65px',
            boxShadow: '0px 2px 4px rgba(100, 116, 139, 0.16)',
            width: '684px',
            height: 'calc(100% - 65px)',
          },
        }}
      >
        <CreateClusterFlow
          onMenuClose={handleMenuClose}
          onClusterDelete={openDeleteModal}
          cluster={presentedCluster}
          onSubmit={handleCreateCluster}
        />
      </Drawer>
      {presentedCluster && (
        <DeleteCluster
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDeleteCluster}
          cluster={presentedCluster}
        />
      )}
    </Container>
  );
};

export default ClusterManagement;
