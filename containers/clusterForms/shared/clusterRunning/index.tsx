import React, { FunctionComponent, useCallback } from 'react';

import ClusterReady from '../../../../components/clusterReady';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { setSelectedCluster } from '../../../../redux/slices/cluster.slice';

const ClusterRunning: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { managementCluster } = useAppSelector(({ api }) => api);

  const onOpenConsole = useCallback(() => {
    dispatch(setSelectedCluster(managementCluster));
  }, [dispatch, managementCluster]);

  return (
    <ClusterReady
      onOpenConsole={onOpenConsole}
      clusterName={managementCluster?.clusterName}
      domainName={managementCluster?.domainName}
      kbotPassword={managementCluster?.vaultAuth?.kbotPassword}
    />
  );
};

export default ClusterRunning;
