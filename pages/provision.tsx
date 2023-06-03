import React, { FunctionComponent, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../redux/store';
import useFeatureFlag from '../hooks/useFeatureFlag';
import Provision from '../containers/provision';
import withConfig from '../hoc/withConfig';
export { getServerSideProps } from '../hoc/withConfig';

const ProvisionPage: FunctionComponent = () => {
  const { push } = useRouter();
  const selectedCluster = useAppSelector(({ cluster }) => cluster.selectedCluster);

  const { isEnabled: isClusterManagementEnabled } = useFeatureFlag('cluster-management');

  const isEnabled = useMemo(
    () => isClusterManagementEnabled || !selectedCluster?.clusterName,
    [isClusterManagementEnabled, selectedCluster?.clusterName],
  );

  if (!isEnabled) {
    push('/services');
  }

  return isEnabled ? <Provision /> : null;
};

export default withConfig(ProvisionPage);
