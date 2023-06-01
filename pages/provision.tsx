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
  const { KUBEFIRST_VERSION = '', USE_TELEMETRY = '' } = process.env;

  return {
    props: {
      kubefirstVersion: KUBEFIRST_VERSION,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
}

export default ProvisionPage;
