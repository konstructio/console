import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import useFeatureFlag from '../hooks/useFeatureFlag';
import ClusterManagement, { ClusterManagementProps } from '../containers/clusterManagement';

const ClusterManagementPage: FunctionComponent<ClusterManagementProps> = (props) => {
  const { push } = useRouter();

  const { flagsAreReady } = useFeatureFlag('cluster-management');

  useEffect(() => {
    if (!flagsAreReady) {
      push('/');
    }
  });

  if (!flagsAreReady) {
    return null;
  }

  return <ClusterManagement {...props} />;
};

export async function getServerSideProps() {
  const { API_URL = '', KUBEFIRST_VERSION = '', USE_TELEMETRY = '' } = process.env;

  return {
    props: {
      apiUrl: API_URL,
      kubefirstVersion: KUBEFIRST_VERSION,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
}

export default ClusterManagementPage;
