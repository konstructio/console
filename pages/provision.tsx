import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import useFeatureFlag from '../hooks/useFeatureFlag';
import Provision, { ProvisionProps } from '../containers/provision';

const ProvisionPage: FunctionComponent<ProvisionProps> = ({ apiUrl, useTelemetry }) => {
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

  return <Provision apiUrl={apiUrl} useTelemetry={useTelemetry} />;
};

export async function getServerSideProps() {
  const { API_URL = '', USE_TELEMETRY = '' } = process.env;

  return {
    props: {
      apiUrl: API_URL,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
}

export default ProvisionPage;
