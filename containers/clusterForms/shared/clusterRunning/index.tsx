import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import ClusterReady from '../../../../components/clusterReady';
import { getClusters } from '../../../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

export interface ClusterRunningProps {
  clusterName?: string;
  domainName?: string;
}

const ClusterRunning: FunctionComponent<ClusterRunningProps> = (props) => {
  const dispatch = useAppDispatch();
  const { installValues, selectedCluster } = useAppSelector(({ installation, cluster }) => ({
    installValues: installation.values,
    selectedCluster: cluster.selectedCluster,
  }));
  const { push } = useRouter();

  const onOpenConsole = () => {
    dispatch(getClusters());
    push('/services');
  };

  return (
    <ClusterReady
      onOpenConsole={onOpenConsole}
      clusterName={installValues?.clusterName}
      domainName={installValues?.domainName}
      kbotPassword={selectedCluster?.vaultAuth?.kbotPassword}
      {...props}
    />
  );
};

export default ClusterRunning;
