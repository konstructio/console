import React, { FunctionComponent, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { setSelectedCluster } from 'redux/slices/cluster.slice';

import { getClusters } from '../../redux/thunks/api.thunk';
import Menu from '../../components/menu';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { ClusterIndicator, ClusterMenu, Container } from './header.styled';

const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { apiUrl, clusters, selectedCluster } = useAppSelector(({ api, cluster, config }) => ({
    clusters: api.clusters,
    apiUrl: config.apiUrl,
    selectedCluster: cluster.selectedCluster,
  }));

  const handleSelectCluster = (selectedClusterName: string) => {
    const selectedCluster = clusters.find(({ clusterName }) => clusterName === selectedClusterName);

    if (selectedCluster) {
      dispatch(setSelectedCluster(selectedCluster));
    }
  };

  useEffect(() => {
    if (apiUrl) {
      dispatch(getClusters({ apiUrl }));
    }
  }, [apiUrl, dispatch]);

  useEffect(() => {
    if (clusters.length && !selectedCluster) {
      dispatch(setSelectedCluster(clusters[0]));
    }
  }, [clusters, clusters.length, dispatch, selectedCluster]);

  return (
    <Container>
      {clusters?.length ? (
        <Menu
          onClickMenu={(cluster) => handleSelectCluster(cluster)}
          label={
            <ClusterMenu>
              <ClusterIndicator />
              {selectedCluster?.clusterName}
              <KeyboardArrowDownIcon />
            </ClusterMenu>
          }
          options={clusters && clusters.map(({ clusterName }) => ({ label: clusterName }))}
        />
      ) : null}
    </Container>
  );
};

export default Header;
