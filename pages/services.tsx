import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import useFeatureFlag from '../hooks/useFeatureFlag';
import Services from '../containers/services';

interface ServicesPageProps {
  apiUrl: string;
  argoUrl: string;
  argoWorkflowsUrl: string;
  atlantisUrl: string;
  domainName: string;
  githubOwner: string;
  gitlabOwner: string;
  gitProvider: string;
  k3dDomain: string;
  kubefirstVersion: string;
  useTelemetry: boolean;
  vaultUrl: string;
  metaphor: {
    development: string;
    staging: string;
    production: string;
  };
}

const ServicesPage: FunctionComponent<ServicesPageProps> = (props) => {
  const { push } = useRouter();

  const { flagsAreReady } = useFeatureFlag('cluster-management');

  useEffect(() => {
    if (!flagsAreReady) {
      push('/');
    }
  });

  return <Services {...props} />;
};

export async function getServerSideProps() {
  const {
    API_URL = '',
    DOMAIN_NAME = '',
    K3D_DOMAIN = '',
    KUBEFIRST_VERSION = '',
    USE_TELEMETRY = '',
    VAULT_URL = '',
  } = process.env;

  return {
    props: {
      apiUrl: API_URL,
      domainName: DOMAIN_NAME,
      k3dDomain: K3D_DOMAIN,
      kubefirstVersion: KUBEFIRST_VERSION,
      useTelemetry: USE_TELEMETRY === 'true',
      vaultUrl: VAULT_URL,
    },
  };
}

export default ServicesPage;
