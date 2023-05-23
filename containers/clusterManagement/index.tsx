import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { Snackbar } from '@mui/material';
import { useRouter } from 'next/router';

import ClusterDetails from '../../components/clusterDetails';
import Button from '../../components/button';
import Typography from '../../components/typography';
import Table from '../../components/table';
import { DELETE_OPTION, VIEW_DETAILS_OPTION } from '../../constants/cluster';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getCluster, getClusters } from '../../redux/thunks/api.thunk';
import { resetInstallState } from '../../redux/slices/installation.slice';
import { setConfigValues } from '../../redux/slices/config.slice';
import { Cluster, ClusterRequestProps } from '../../types/provision';
import useToggle from '../../hooks/useToggle';
import Drawer from '../../components/drawer';
import { Row } from '../../types';
import useModal from '../../hooks/useModal';
import DeleteCluster from '../deleteCluster';

import { Container, Content, Description, Header, LearnMoreLink } from './clusterManagement.styled';
import { getClusterManagementColumns, getClusterState } from './columnDefinition';

export interface ClusterManagementProps {
  apiUrl: string;
  useTelemetry: boolean;
  kubefirstVersion: string;
}

const ClusterManagement: FunctionComponent<ClusterManagementProps> = ({
  apiUrl,
  kubefirstVersion,
  useTelemetry,
}) => {
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
    dispatch(deleteCluster({ apiUrl, clusterName: selectedCluster?.clusterName })).unwrap();
    handleGetClusters();
    closeDeleteModal();
  };

  const handleCreateCluster = async () => {
    await dispatch(resetInstallState());
    push('/provision');
  };

  const handleGetClusters = useCallback(async (): Promise<void> => {
    await dispatch(getClusters({ apiUrl }));
  }, [apiUrl, dispatch]);

  const getClusterInterval = (params: ClusterRequestProps) => {
    return setInterval(async () => {
      dispatch(getCluster(params)).unwrap();
    }, 10000);
  };

  useEffect(() => {
    if (isDeleting && !isDeleted && selectedCluster) {
      interval.current = getClusterInterval({
        apiUrl,
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
  }, [apiUrl, dispatch, handleGetClusters]);

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, apiUrl, kubefirstVersion }));
  }, [dispatch, useTelemetry, apiUrl, kubefirstVersion]);

  return (
    <Container>
      <Header>
        <div>
          <Typography variant="h6">Cluster Management</Typography>
          <Description variant="body2">
            Add and manage your clusters.{' '}
            <LearnMoreLink href="https://docs.kubefirst.io" target="_blank">
              Learn more
            </LearnMoreLink>
          </Description>
        </div>
        <Button variant="contained" color="primary" onClick={handleCreateCluster}>
          Add cluster
        </Button>
      </Header>
      <Content>
        {clusters && (
          <Table
            columns={getClusterManagementColumns(handleMenuClick)}
            rows={clusters}
            getRowClassName={getClusterState}
          />
        )}
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
        sx={{ top: '20px' }}
        PaperProps={{ sx: { top: '46px', boxShadow: '0px 2px 4px rgba(100, 116, 139, 0.16)' } }}
        onClose={closeDetailsPanel}
      >
        {selectedCluster && (
          <ClusterDetails cluster={selectedCluster} onClose={closeDetailsPanel} />
        )}
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
