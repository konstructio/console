import React, { FunctionComponent } from 'react';

import Services from '../containers/services';

interface ServicesPageProps {
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
  return <Services {...props} />;
};

export async function getServerSideProps() {
  const {
    ARGO_CD_URL = '',
    ARGO_WORKFLOWS_URL = '',
    ATLANTIS_URL = '',
    DOMAIN_NAME = '',
    GIT_PROVIDER = '',
    GITHUB_OWNER = '',
    GITLAB_OWNER = '',
    K3D_DOMAIN = '',
    KUBEFIRST_VERSION = '',
    METAPHOR_DEVELOPMENT_URL = '',
    METAPHOR_STAGING_URL = '',
    METAPHOR_PRODUCTION_URL = '',
    USE_TELEMETRY = '',
    VAULT_URL = '',
  } = process.env;

  return {
    props: {
      argoUrl: ARGO_CD_URL,
      argoWorkflowsUrl: ARGO_WORKFLOWS_URL,
      atlantisUrl: ATLANTIS_URL,
      domainName: DOMAIN_NAME,
      githubOwner: GITHUB_OWNER,
      gitlabOwner: GITLAB_OWNER,
      gitProvider: GIT_PROVIDER,
      k3dDomain: K3D_DOMAIN,
      kubefirstVersion: KUBEFIRST_VERSION,
      useTelemetry: USE_TELEMETRY === 'true',
      vaultUrl: VAULT_URL,
      metaphor: {
        development: METAPHOR_DEVELOPMENT_URL,
        staging: METAPHOR_STAGING_URL,
        production: METAPHOR_PRODUCTION_URL,
      },
    },
  };
}

export default ServicesPage;
