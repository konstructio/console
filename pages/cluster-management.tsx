import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import withConfig from '../hoc/withConfig';
import useFeatureFlag from '../hooks/useFeatureFlag';
import ClusterManagement from '../containers/clusterManagement';
export { getServerSideProps } from '../hoc/withConfig';

const ClusterManagementPage: FunctionComponent = () => {
  const { push } = useRouter();

  const { isEnabled: isClusterManagementEnabled } = useFeatureFlag('cluster-management');

  useEffect(() => {
    if (!isClusterManagementEnabled) {
      push('/');
    }
  });

  return isClusterManagementEnabled ? <ClusterManagement /> : null;
};

export default withConfig(ClusterManagementPage);
