import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import { QueueProvider } from '../hooks/useQueue';
import withConfig from '../hoc/withConfig';
import useFeatureFlag from '../hooks/useFeatureFlag';
import ClusterManagement from '../containers/clusterManagement';
export { getServerSideProps } from '../hoc/withConfig';

const ClusterManagementPage: FunctionComponent = () => {
  const { push } = useRouter();

  const { isEnabled: isMultiClusterEnabled } = useFeatureFlag('multicluster-management');

  useEffect(() => {
    if (!isMultiClusterEnabled) {
      push('/');
    }
  });

  return isMultiClusterEnabled ? (
    <QueueProvider>
      <ClusterManagement />
    </QueueProvider>
  ) : null;
};

export default withConfig(ClusterManagementPage);
