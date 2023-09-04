import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { resetClusterServices, setSelectedCluster } from '../../redux/slices/cluster.slice';
import { getClusters } from '../../redux/thunks/api.thunk';
import Menu from '../../components/menu';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Typography from '../../components/typography';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import { SALTBOX_BLUE } from '../../constants/colors';

import { ClusterIndicator, ClusterMenu, Container } from './header.styled';

const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useRouter();
  const { isEnabled } = useFeatureFlag('multicluster-management');
  const { clusters, selectedCluster } = useAppSelector(({ api, cluster }) => ({
    clusters: api.managementCluster
      ? [api.managementCluster, ...api.managementCluster.workloadClusters]
      : [],
    selectedCluster: cluster.selectedCluster,
  }));

  const isClusterSelectorEnabled = useMemo(
    () => pathname.includes('/services') && clusters.length && isEnabled,
    [clusters.length, isEnabled, pathname],
  );

  const handleSelectCluster = useCallback(
    async (selectedClusterName: string) => {
      const selectedCluster = clusters.find(
        ({ clusterName }) =>
          clusterName && clusterName.toLowerCase() === selectedClusterName.toLowerCase(),
      );

      if (selectedCluster) {
        dispatch(resetClusterServices());
        dispatch(setSelectedCluster(selectedCluster));
      }
    },
    [clusters, dispatch],
  );

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
      {isClusterSelectorEnabled ? (
        <Menu
          onClickMenu={handleSelectCluster}
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
            clusters &&
            clusters.map(({ clusterName }) => ({ label: clusterName?.toUpperCase() ?? '' }))
          }
        />
      ) : null}
    </Container>
  );
};

export default Header;
