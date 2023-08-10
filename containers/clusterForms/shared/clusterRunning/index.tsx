import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import { getClusters } from '../../../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import ClusterReady from '../../../../components/clusterReady';

export interface ClusterRunningProps {
  clusterName?: string;
  domainName?: string;
}

const ClusterRunning: FunctionComponent<ClusterRunningProps> = (props) => {
  const dispatch = useAppDispatch();
  const installValues = useAppSelector(({ installation }) => installation.values);
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
      {...props}
    />
  );
};

export default ClusterRunning;
