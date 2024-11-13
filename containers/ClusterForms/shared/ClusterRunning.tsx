import React, { FunctionComponent, useEffect } from 'react';
import { noop } from 'lodash';

import ClusterReady from '@/components/ClusterReady/ClusterReady';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getClusters } from '@/redux/thunks/api.thunk';

const ClusterRunning: FunctionComponent = () => {
  const { managementCluster } = useAppSelector(({ api }) => api);
  const dispatch = useAppDispatch();

  const { clusterName, domainName, subDomainName, vaultAuth } = managementCluster ?? {};

  const fullDomainName = `${subDomainName ? `${subDomainName}.${domainName}` : domainName}`;

  useEffect(() => {
    dispatch(getClusters());
  }, [dispatch]);

  return (
    <ClusterReady
      onOpenConsole={noop}
      clusterName={clusterName}
      domainName={fullDomainName}
      kbotPassword={vaultAuth?.kbotPassword}
    />
  );
};

export default ClusterRunning;
