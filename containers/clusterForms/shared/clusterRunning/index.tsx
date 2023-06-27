import React, { FunctionComponent } from 'react';
import { getClusters } from 'redux/thunks/api.thunk';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../redux/store';
import ClusterReady from '../../../../components/clusterReady';

const ClusterRunning: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const onOpenConsole = () => {
    dispatch(getClusters());
    push('/services');
  };

  return <ClusterReady onOpenConsole={onOpenConsole} />;
};

export default ClusterRunning;
