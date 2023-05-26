import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'redux/store';

import useFeatureFlag from '../hooks/useFeatureFlag';
import Provision, { ProvisionProps } from '../containers/provision';

const ProvisionPage: FunctionComponent<ProvisionProps> = (props) => {
  const { push } = useRouter();
  const selectedCluster = useAppSelector(({ cluster }) => cluster.selectedCluster);

  const { flagsAreReady } = useFeatureFlag('cluster-provisioning');
  const { isEnabled: isClusterManagementEnabled } = useFeatureFlag('cluster-management');

  useEffect(() => {
    if (!flagsAreReady) {
      push('/');
    }
  });

  if (!isClusterManagementEnabled && !!selectedCluster?.clusterName) {
    push('/services');
  }

  if (!flagsAreReady) {
    return null;
  }

  return <Provision {...props} />;
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

export default ProvisionPage;
