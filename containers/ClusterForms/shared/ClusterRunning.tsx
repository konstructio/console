import React, { FunctionComponent } from 'react';
import { noop } from 'lodash';

import ClusterReady from '@/components/ClusterReady/ClusterReady';
import { useAppSelector } from '@/redux/store';

const ClusterRunning: FunctionComponent = () => {
  const { managementCluster } = useAppSelector(({ api }) => api);

  const { clusterName, domainName, subDomainName, vaultAuth } = managementCluster ?? {};

  const fullDomainName = `${subDomainName ? `${subDomainName}.${domainName}` : domainName}`;

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
