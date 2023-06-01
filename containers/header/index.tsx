import React, { FunctionComponent, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { setSelectedCluster } from 'redux/slices/cluster.slice';

import { getClusters } from '../../redux/thunks/api.thunk';
import Menu from '../../components/menu';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Typography from '../../components/typography';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import { SALTBOX_BLUE } from '../../constants/colors';

import { ClusterIndicator, ClusterMenu, Container } from './header.styled';

const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { clusters, selectedCluster } = useAppSelector(({ api, cluster }) => ({
    clusters: api.clusters,
    selectedCluster: cluster.selectedCluster,
  }));

  const { isEnabled, flagsAreReady } = useFeatureFlag('cluster-management');

  const handleSelectCluster = (selectedClusterName: string) => {
    const selectedCluster = clusters.find(
      ({ clusterName }) => clusterName.toLowerCase() === selectedClusterName.toLowerCase(),
    );

    if (selectedCluster) {
      dispatch(setSelectedCluster(selectedCluster));
    }
  };

  useEffect(() => {
    dispatch(getClusters());
  }, [dispatch]);

  useEffect(() => {
    if (clusters.length && !selectedCluster) {
      dispatch(setSelectedCluster(clusters[0]));
    }
  }, [clusters, clusters.length, dispatch, selectedCluster]);

  return (
    <Container>
      {clusters?.length && isEnabled && flagsAreReady ? (
        <Menu
          onClickMenu={(cluster) => handleSelectCluster(cluster)}
          label={
            <ClusterMenu>
              <ClusterIndicator />
              <Typography variant="body2" color={SALTBOX_BLUE}>
                {selectedCluster?.clusterName}
              </Typography>
              <KeyboardArrowDownIcon htmlColor={SALTBOX_BLUE} />
            </ClusterMenu>
          }
          options={
            clusters && clusters.map(({ clusterName }) => ({ label: clusterName.toUpperCase() }))
          }
        />
      ) : null}
    </Container>
  );
};

export default Header;
