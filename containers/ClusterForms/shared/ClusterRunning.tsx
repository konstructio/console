import React, { FunctionComponent, useEffect } from 'react';

import ClusterReady from '@/components/ClusterReady/ClusterReady';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getClusters } from '@/redux/thunks/api.thunk';
import { ManagementCluster } from '@/types/provision';
import ClusterProReady from '@/components/ClusterProReady/ClusterProReady';

const ClusterRunning: FunctionComponent = () => {
  const { managementCluster } = useAppSelector(({ api }) => api);
  const dispatch = useAppDispatch();

  const { clusterName, domainName, subDomainName, vaultAuth, cloudProvider, skipInstallPro } =
    managementCluster ?? ({} as ManagementCluster);

  const fullDomainName = `${subDomainName ? `${subDomainName}.${domainName}` : domainName}`;

  const ClusterReadyComponent = skipInstallPro ? ClusterReady : ClusterProReady;

  useEffect(() => {
    dispatch(getClusters());
  }, [dispatch]);

  return (
    <ClusterReadyComponent
      clusterName={clusterName}
      domainName={fullDomainName}
      cloudProvider={cloudProvider}
      kbotPassword={vaultAuth?.kbotPassword}
    />
  );
};

export default ClusterRunning;
