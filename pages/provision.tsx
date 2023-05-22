import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import useFeatureFlag from '../hooks/useFeatureFlag';
import Provision, { ProvisionProps } from '../containers/provision';

const ProvisionPage: FunctionComponent<ProvisionProps> = (props) => {
  const { push } = useRouter();

  const { flagsAreReady } = useFeatureFlag('cluster-provisioning');

  useEffect(() => {
    if (!flagsAreReady) {
      push('/');
    }
  });

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
