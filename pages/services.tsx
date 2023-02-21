import React, { FunctionComponent } from 'react';

import Services from '../containers/services';

interface ServicesPageProps {
  argoUrl: string;
  argoWorkflowsUrl: string;
  atlantisUrl: string;
  domainName: string;
  gitProvider: string;
  kubefirstVersion: string;
  useTelemetry: boolean;
  vaultUrl: string;
  metaphor: {
    development: string;
    staging: string;
    production: string;
  };
}

const ServicesPage: FunctionComponent<ServicesPageProps> = ({ ...props }) => {
  return <Services {...props} />;
};

export async function getServerSideProps() {
  const {
    ARGO_CD_URL = '',
    ARGO_WORKFLOWS_URL = '',
    ATLANTIS_URL = '',
    GIT_PROVIDER = '',
    DOMAIN_NAME = '',
    KUBEFIRST_VERSION = '',
    METAPHOR_FRONT_DEV = '',
    METAPHOR_FRONT_STAGING = '',
    METAPHOR_FRONT_PROD = '',
    USE_TELEMETRY = '',
    VAULT_URL = '',
  } = process.env;

  return {
    props: {
      argoUrl: ARGO_CD_URL,
      argoWorkflowsUrl: ARGO_WORKFLOWS_URL,
      atlantisUrl: ATLANTIS_URL,
      domainName: DOMAIN_NAME,
      gitProvider: GIT_PROVIDER,
      kubefirstVersion: KUBEFIRST_VERSION,
      useTelemetry: USE_TELEMETRY === 'true',
      vaultUrl: VAULT_URL,
      metaphor: {
        development: METAPHOR_FRONT_DEV,
        staging: METAPHOR_FRONT_STAGING,
        production: METAPHOR_FRONT_PROD,
      },
    },
  };
}

export default ServicesPage;
