import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Snackbar, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';

import Button from '../../components/button';
import Typography from '../../components/typography';
import { DELETE_OPTION, VIEW_DETAILS_OPTION } from '../../constants/cluster';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getCluster, getClusters } from '../../redux/thunks/api.thunk';
import { resetInstallState } from '../../redux/slices/installation.slice';
import { Cluster, ClusterRequestProps } from '../../types/provision';
import useToggle from '../../hooks/useToggle';
import Drawer from '../../components/drawer';
import { Row } from '../../types';
import useModal from '../../hooks/useModal';
import DeleteCluster from '../deleteCluster';

import {
  CloseButton,
  ClusterMenuFooter,
  Container,
  Content,
  FinalFormContainer,
  Form,
  Header,
  MenuHeader,
} from './clusterManagement.styled';

import { getClusterManagementColumns, getClusterState } from './columnDefinition';

import FinalForm, { ClusterConfig } from '../../containers/clusterForms/finalForm';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';
import { Flow } from '../../components/flow';
import closeImageSrc from '../../assets/close.svg';
import Column from '../../components/column';
import { ClusterTable } from '../../components/clusterTable/clusterTable';
import LinearProgress from '../../components/linearProgress';
import TerminalLogs from '../../containers/terminalLogs/terminalLogs';

enum MANAGEMENT_TABS {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}

const ClusterManagement: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(MANAGEMENT_TABS.LIST_VIEW);
  const [selectedCluster, setSelectedCluster] = useState<Cluster>();
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
  const isClusterZero = useAppSelector(({ config }) => config.isClusterZero);
  const { isDeleted, isDeleting, isError, clusters } = useAppSelector(({ api }) => api);

  const handleMenuClick = (option: string, rowItem: Row) => {
    const { clusterName } = rowItem;
    setSelectedCluster(clusters.find((cluster) => cluster.clusterName === clusterName));

    if (option === DELETE_OPTION) {
      openDeleteModal();
    } else if (option === VIEW_DETAILS_OPTION) {
      openDetailsPanel();
    }
  };

  const handleDeleteCluster = () => {
    dispatch(deleteCluster({ clusterName: selectedCluster?.clusterName })).unwrap();
    handleGetClusters();
    closeDeleteModal();
  };

  const handleCreateCluster = async () => {
    await dispatch(resetInstallState());
    push('/provision');
  };

  const handleGetClusters = useCallback(async (): Promise<void> => {
    await dispatch(getClusters());
  }, [dispatch]);

  const getClusterInterval = (params: ClusterRequestProps) => {
    return setInterval(async () => {
      dispatch(getCluster(params)).unwrap();
    }, 10000);
  };

  useEffect(() => {
    if (isDeleting && !isDeleted && selectedCluster) {
      interval.current = getClusterInterval({
        clusterName: selectedCluster?.clusterName as string,
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

  const methods = useForm<ClusterConfig>();

  const formRef = useRef<HTMLFormElement>(null);

  enum CLUSTER_MANAGEMENT_STEP {
    CREATE,
    PROVISION,
    DETAILS,
  }

  const [workloadClusterStep, setWorkloadClusterStep] = useState<CLUSTER_MANAGEMENT_STEP>(
    CLUSTER_MANAGEMENT_STEP.CREATE,
  );

  const handleMenuClose = useCallback(() => {
    closeDetailsPanel();
    setWorkloadClusterStep(CLUSTER_MANAGEMENT_STEP.CREATE);
  }, [setWorkloadClusterStep, CLUSTER_MANAGEMENT_STEP, closeDetailsPanel]);

  const handleClick = useCallback(() => {
    setWorkloadClusterStep((curStep) =>
      curStep === CLUSTER_MANAGEMENT_STEP.DETAILS ? curStep : curStep + 1,
    );
  }, [setWorkloadClusterStep, CLUSTER_MANAGEMENT_STEP]);

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
          <ClusterTable clusters={clusters} />
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
        onClose={() => setWorkloadClusterStep(CLUSTER_MANAGEMENT_STEP.CREATE)}
      >
        <MenuHeader>
          <Typography variant="subtitle2">Create workload cluster</Typography>
          <CloseButton onClick={handleMenuClose}>
            <Image src={closeImageSrc} height={24} width={24} alt="close" />
          </CloseButton>
        </MenuHeader>
        <Column style={{ flex: 1, padding: '0 24px' }}>
          {workloadClusterStep === CLUSTER_MANAGEMENT_STEP.CREATE && (
            <FormProvider {...methods}>
              <FinalForm
                onFinalFormSubmit={(config) => console.log('the values =>', config)}
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
          {workloadClusterStep === CLUSTER_MANAGEMENT_STEP.DETAILS && <p>Details step</p>}
        </Column>
        <ClusterMenuFooter>
          <Button variant="outlined" color="primary" onClick={handleMenuClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Create cluster
          </Button>
        </ClusterMenuFooter>
      </Drawer>
      <DeleteCluster
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteCluster}
        clusterName={selectedCluster?.clusterName}
      />
    </Container>
  );
};

export default ClusterManagement;
