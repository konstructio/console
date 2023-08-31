import React, { FunctionComponent, useCallback, useState } from 'react';
import { Box, Tabs } from '@mui/material';

import Button from '../../components/button';
import Typography from '../../components/typography';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getClusters } from '../../redux/thunks/api.thunk';
import { Cluster, ClusterCreationStep, ClusterStatus } from '../../types/provision';
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
import { setSelectedCluster } from '../../redux/slices/api.slice';
import { useQueue } from '../../hooks/useQueue';

import { CreateClusterFlow } from './createClusterFlow';
import { Container, Content, Header } from './clusterManagement.styled';

enum MANAGEMENT_TABS {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}

const ClusterManagement: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(MANAGEMENT_TABS.LIST_VIEW);

  const { clusterQueue, managementCluster, clusterCreationStep, selectedCluster } = useAppSelector(
    ({ api, queue }) => ({
      managementCluster: api.managementCluster,
      clusterCreationStep: api.clusterCreationStep,
      selectedCluster: api.selectedCluster,
      clusterQueue: queue.clusterQueue,
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

  const handleDeleteCluster = useCallback(async () => {
    if (selectedCluster) {
      await dispatch(deleteCluster(selectedCluster?.id)).unwrap();
      handleGetClusters();
      addClusterToQueue({
        id: selectedCluster?.id,
        clusterName: managementCluster?.clusterName as string,
        status: ClusterStatus.DELETING,
        callback: handleGetClusters,
      });

      closeDeleteModal();
      closeCreateClusterFlow();
    }
  }, [
    selectedCluster,
    dispatch,
    handleGetClusters,
    addClusterToQueue,
    managementCluster?.clusterName,
    closeDeleteModal,
    closeCreateClusterFlow,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleNodeClick = useCallback(
    (cluster: Cluster) => {
      dispatch(setSelectedCluster(cluster));
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

  const handleMenuClose = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG) {
      dispatch(removeDraftCluster());
    } else {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    dispatch(setSelectedCluster(undefined));
    closeCreateClusterFlow();
  }, [clusterCreationStep, dispatch, closeCreateClusterFlow]);

  const handleOnCreateCluster = async (clusterId: string) => {
    if (managementCluster) {
      handleGetClusters();
      addClusterToQueue({
        id: clusterId,
        clusterName: managementCluster?.clusterName as string,
        status: ClusterStatus.PROVISIONING,
        callback: handleGetClusters,
      });
    }
  };

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
        <Button
          color="primary"
          variant="contained"
          style={{ marginRight: '24px' }}
          onClick={handleAddWorkloadCluster}
        >
          Add workload cluster
        </Button>
      </Header>
      <Content>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.LIST_VIEW}>
          {managementCluster && (
            <ClusterTable
              managementCluster={managementCluster}
              onDeleteCluster={openDeleteModal}
              onMenuOpenClose={(clusterInfo) => dispatch(setSelectedCluster(clusterInfo))}
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
          cluster={selectedCluster}
          onSubmit={handleOnCreateCluster}
        />
      </Drawer>
      {selectedCluster && (
        <DeleteCluster
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDeleteCluster}
          cluster={selectedCluster}
        />
      )}
    </Container>
  );
};

export default ClusterManagement;
