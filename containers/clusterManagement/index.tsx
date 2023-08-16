import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Snackbar, Tabs } from '@mui/material';
import { useRouter } from 'next/router';

import Button from '../../components/button';
import Typography from '../../components/typography';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getCluster, getClusters } from '../../redux/thunks/api.thunk';
import { resetInstallState } from '../../redux/slices/installation.slice';
import { ClusterRequestProps } from '../../types/provision';
import useToggle from '../../hooks/useToggle';
import Drawer from '../../components/drawer';
import useModal from '../../hooks/useModal';
import DeleteCluster from '../deleteCluster';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';
import { Flow } from '../../components/flow';
import { ClusterInfo, ClusterTable } from '../../components/clusterTable/clusterTable';
import { sortClustersByType } from '../../utils/sortClusterByType';

import { CreateClusterFlow } from './createClusterFlow';
import { Container, Content, Header } from './clusterManagement.styled';

enum MANAGEMENT_TABS {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}

const ClusterManagement: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(MANAGEMENT_TABS.LIST_VIEW);
  const [selectedCluster, setSelectedCluster] = useState<ClusterInfo>();
  const isClusterZero = useAppSelector(({ config }) => config.isClusterZero);

  const {
    isOpen: isDetailsPanelOpen,
    open: openDetailsPanel,
    close: closeDetailsPanel,
  } = useToggle();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const interval = useRef<NodeJS.Timer>();
  const { push } = useRouter();

  const dispatch = useAppDispatch();

  const { isDeleted, isDeleting, isError, managementCluster, workloadClusters } = useAppSelector(
    ({ api }) => api,
  );

  const handleGetClusters = useCallback(async (): Promise<void> => {
    await dispatch(getClusters());
  }, [dispatch]);

  const handleDeleteCluster = useCallback(async () => {
    if (selectedCluster) {
      await dispatch(deleteCluster({ clusterName: selectedCluster.clusterName })).unwrap();
      handleGetClusters();
      closeDeleteModal();
    }
  }, [dispatch, selectedCluster, handleGetClusters, closeDeleteModal]);

  const handleCreateCluster = () => {
    dispatch(resetInstallState());
    push('/provision');
  };

  const getClusterInterval = (params: ClusterRequestProps) => {
    return setInterval(async () => {
      dispatch(getCluster(params)).unwrap();
    }, 10000);
  };

  useEffect(() => {
    if (isDeleting && !isDeleted && selectedCluster) {
      interval.current = getClusterInterval({
        clusterName: selectedCluster.clusterName,
      });
      handleGetClusters();
    }

    if (isDeleted) {
      clearInterval(interval.current);
      handleGetClusters();
    }

    if (isError) {
      handleGetClusters();
    }

    return () => clearInterval(interval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted, isDeleting]);

  useEffect(() => {
    handleGetClusters();
  }, [dispatch, handleGetClusters]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
          onClick={openDetailsPanel}
        >
          Add workload cluster
        </Button>
      </Header>
      <Content>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.LIST_VIEW}>
          {managementCluster && (
            <ClusterTable
              managementCluster={managementCluster}
              workloadClusters={workloadClusters}
              onDeleteCluster={openDeleteModal}
              onMenuOpenClose={(clusterInfo) => setSelectedCluster(clusterInfo)}
            />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.GRAPH_VIEW}>
          <Flow />
        </TabPanel>
      </Content>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isDeleted}
        autoHideDuration={3000}
        message={`Cluster ${selectedCluster?.clusterName} has been deleted`}
      />
      <Drawer
        open={isDetailsPanelOpen}
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
        <CreateClusterFlow onMenuClose={closeDetailsPanel} />
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
