import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Snackbar, Tabs } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';
import { GitProvider } from 'types';

import ClusterMap from '../../components/clusterMap';
import Button from '../../components/button';
import Typography from '../../components/typography';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import Table, { Row } from '../../components/table';
import { BISCAY, FIRE_BRICK } from '../../constants/colors';
import { CLUSTER_MANAGEMENT_COLUMNS } from '../../constants/cluster';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCluster, getCluster, getClusters } from '../../redux/thunks/cluster';
import { resetInstallState } from '../../redux/slices/installation.slice';
import { setConfigValues } from '../../redux/slices/config.slice';
import { InstallationType } from '../../types/redux';
import { ClusterProps } from '../../types/provision';
import GitLabLogo from '../../assets/gitlab.svg';
import GitHubLogo from '../../assets/github.svg';
import k3dLogo from '../../assets/k3d_logo.svg';
import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';
import digitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import vultrLogo from '../../assets/vultr_logo.svg';

import { Container, Content, Description, Header, LearnMoreLink } from './clusterManagement.styled';

const DELETE_OPTION = 'Delete';
const MENU_OPTIONS = [
  { label: DELETE_OPTION, icon: <DeleteIcon color="error" />, color: FIRE_BRICK },
];

const GIT_PROVIDERS: { [key: string]: StaticImageData } = {
  [GitProvider.GITLAB]: GitLabLogo,
  [GitProvider.GITHUB]: GitHubLogo,
};

const CLOUDS: { [key: string]: StaticImageData } = {
  [InstallationType.AWS]: awsLogo,
  [InstallationType.CIVO]: civoLogo,
  [InstallationType.LOCAL]: k3dLogo,
  [InstallationType.DIGITAL_OCEAN]: digitalOceanLogo,
  [InstallationType.VULTR]: vultrLogo,
};

export interface ClusterManagementProps {
  apiUrl: string;
  useTelemetry: boolean;
}

const ClusterManagement: FunctionComponent<ClusterManagementProps> = ({ apiUrl, useTelemetry }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const interval = useRef<NodeJS.Timer>();
  const { push } = useRouter();

  const dispatch = useAppDispatch();
  const { isDeleted, isDeleting, isError, clusters } = useAppSelector(({ cluster }) => cluster);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMenuClick = (option: string, rowItem: Row) => {
    const { clusterName } = rowItem;
    if (option === DELETE_OPTION) {
      handleDeleteCluster(clusterName as string);
      setSelectedCluster(clusterName as string);
    }
  };

  const handleDeleteCluster = (clusterName: string) => {
    dispatch(deleteCluster({ apiUrl, clusterName })).unwrap();
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
          Create cluster
        </Button>
      </Header>
      <Content>
        <Box sx={{ width: '100%' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab color={BISCAY} label="Clusters" {...a11yProps(0)} />
            <Tab color={BISCAY} label="Map" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <Table
              hasActionMenu
              menuOptions={MENU_OPTIONS}
              onClickMenu={handleMenuClick}
              cols={CLUSTER_MANAGEMENT_COLUMNS}
              rows={clusters.map(
                ({
                  CloudProvider,
                  ClusterName,
                  CreationTimestamp,
                  Status,
                  GitProvider,
                  GitUser,
                }) => ({
                  id: ClusterName,
                  clusterName: ClusterName,
                  Status,
                  GitUser,
                  GitProvider: <Image alt={GitProvider} src={GIT_PROVIDERS[GitProvider]} />,
                  Cloud: <Image alt={GitProvider} src={CLOUDS[CloudProvider]} />,
                  CreationTimestamp: moment(new Date(CreationTimestamp)).format(
                    'YYYY MMM DD, h:mm:ss a',
                  ),
                }),
              )}
            />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <ClusterMap clusters={clusters} />
          </TabPanel>
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
