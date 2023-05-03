import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';

import Button from '../../components/button';
import Typography from '../../components/typography';
import Table, { Row } from '../../components/table';
import { FIRE_BRICK } from '../../constants/colors';
import { CLUSTER_MANAGEMENT_COLUMNS } from '../../constants/cluster';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getCluster, getClusters } from '../../redux/thunks/cluster';
import { resetInstallState } from '../../redux/slices/installation.slice';
import { setConfigValues } from '../../redux/slices/config.slice';
import { ClusterProps } from '../../types/provision';

import { Container, Content, Description, Header, LearnMoreLink } from './clusterManagement.styled';

const VIEW_DETAILS_OPTION = 'View details';
const DELETE_OPTION = 'Delete cluster';
const MENU_OPTIONS = [{ label: VIEW_DETAILS_OPTION }, { label: DELETE_OPTION, color: FIRE_BRICK }];

export interface ClusterManagementProps {
  apiUrl: string;
  useTelemetry: boolean;
}

const ClusterManagement: FunctionComponent<ClusterManagementProps> = ({ apiUrl, useTelemetry }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('');
  const interval = useRef<NodeJS.Timer>();
  const { push } = useRouter();

  const dispatch = useAppDispatch();
  const { isDeleted, isDeleting, isError, clusters } = useAppSelector(({ cluster }) => cluster);

  const handleMenuClick = (option: string, rowItem: Row) => {
    const { clusterName } = rowItem;
    if (option === DELETE_OPTION) {
      handleDeleteCluster(clusterName as string);
      setSelectedCluster(clusterName as string);
    }
  };

  const handleDeleteCluster = (clusterName: string) => {
    dispatch(deleteCluster({ apiUrl, clusterName })).unwrap();
    handleGetClusters();
  };

  const handleCreateCluster = async () => {
    await dispatch(resetInstallState());
    push('/provision');
  };

  const handleGetClusters = useCallback(async (): Promise<void> => {
    await dispatch(getClusters({ apiUrl }));
  }, [apiUrl, dispatch]);

  const getClusterInterval = (params: ClusterProps) => {
    return setInterval(async () => {
      dispatch(getCluster(params)).unwrap();
    }, 10000);
  };

  useEffect(() => {
    if (isDeleting && !isDeleted && selectedCluster) {
      interval.current = getClusterInterval({ apiUrl, clusterName: selectedCluster });
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
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, apiUrl }));
  }, [dispatch, useTelemetry, apiUrl]);

  return (
    <Container>
      <Header>
        <div>
          <Typography variant="h6">Cluster Management</Typography>
          <Description variant="body2">
            Manage and invite Kubefirst clusters in one place.{' '}
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
        <Box sx={{ width: '100%' }}>
          <Table
            hasActionMenu
            menuOptions={MENU_OPTIONS}
            onClickMenu={handleMenuClick}
            cols={CLUSTER_MANAGEMENT_COLUMNS}
            rows={
              clusters &&
              clusters.map(({ ClusterName, CreationTimestamp, Status, GitUser }) => ({
                id: ClusterName,
                clusterName: ClusterName,
                Status,
                CreationTimestamp: moment(new Date(CreationTimestamp)).format(
                  'YYYY MMM DD, h:mm:ss',
                ),
                GitUser,
              }))
            }
          />
        </Box>
      </Content>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isDeleted}
        autoHideDuration={3000}
        message={`Cluster ${selectedCluster} has been deleted`}
      />
    </Container>
  );
};

export default ClusterManagement;
