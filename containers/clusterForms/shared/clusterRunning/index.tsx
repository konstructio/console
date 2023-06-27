import React, { FunctionComponent } from 'react';
import { getClusters } from 'redux/thunks/api.thunk';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../redux/store';
import ClusterReady from '../../../../components/clusterReady';

export interface ClusterRunning {
  clusterName?: string;
  domainName?: string;
}

const ClusterRunning: FunctionComponent<ClusterRunning> = (props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const onOpenConsole = () => {
    dispatch(getClusters());
    push('/services');
  };

  return <ClusterReady onOpenConsole={onOpenConsole} {...props} />;
};

export default ClusterRunning;
