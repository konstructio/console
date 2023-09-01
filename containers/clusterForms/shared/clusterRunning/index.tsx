import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import ClusterReady from '../../../../components/clusterReady';
import { getClusters } from '../../../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { ManagementCluster } from '../../../../types/provision';

export interface ClusterRunningProps {
  clusterName?: string;
  domainName?: string;
}

const ClusterRunning: FunctionComponent<ClusterRunningProps> = (props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { installValues, selectedCluster } = useAppSelector(({ installation, api }) => ({
    installValues: installation.values,
    selectedCluster: api.selectedCluster as ManagementCluster,
  }));

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
