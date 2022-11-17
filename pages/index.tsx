import React from 'react';

import { GIT_PROVIDERS } from '../enums/utils';
import Componetn from '../containers/home';
import { CardsContentProps, buildCardsContent } from '../utils/cards';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({ configCardValues, adminEmail, clusterName, hostedZoneName }: any) {
  return (
    <Componetn
      configCardValues={configCardValues}
      adminEmail={adminEmail}
      clusterName={clusterName}
      hostedZoneName={hostedZoneName}
    />
  );
}

export async function getServerSideProps() {
  const {
    HOSTED_ZONE_NAME = '',
    GITHUB_HOST = '',
    GITHUB_OWNER = '',
    ARGO_WORKFLOWS_URL = '',
    VAULT_URL = '',
    ARGO_CD_URL = '',
    ATLANTIS_URL = '',
    METAPHOR_DEV = '',
    METAPHOR_GO_DEV = '',
    METAPHOR_FRONT_DEV = '',
    METAPHOR_STAGING = '',
    METAPHOR_GO_STAGING = '',
    METAPHOR_FRONT_STAGING = '',
    METAPHOR_PROD = '',
    METAPHOR_GO_PROD = '',
    METAPHOR_FRONT_PROD = '',
  } = process.env;

  const params: CardsContentProps = {
    gitProvider: GITHUB_OWNER ? GIT_PROVIDERS.GITHUB : GIT_PROVIDERS.GITLAB,
    gitHost: GITHUB_HOST,
    gitOwner: GITHUB_OWNER,
    hostedZoneName: HOSTED_ZONE_NAME,
    argoWorkflowsUrl: ARGO_WORKFLOWS_URL,
    vaultUrl: VAULT_URL,
    argoUrl: ARGO_CD_URL,
    atlantisUrl: ATLANTIS_URL,
    metaphor: {
      goUrl: METAPHOR_GO_DEV && `${METAPHOR_GO_DEV}/app`,
      nodeJsUrl: METAPHOR_DEV && `${METAPHOR_DEV}/app`,
      reactUrl: METAPHOR_FRONT_DEV,
    },
    metaphorStaging: {
      goUrl: METAPHOR_GO_STAGING && `${METAPHOR_GO_STAGING}/app`,
      nodeJsUrl: METAPHOR_STAGING && `${METAPHOR_STAGING}/app`,
      reactUrl: METAPHOR_FRONT_STAGING,
    },
    metaphorProduction: {
      goUrl: METAPHOR_GO_PROD && `${METAPHOR_GO_PROD}/app`,
      nodeJsUrl: METAPHOR_PROD && `${METAPHOR_PROD}/app`,
      reactUrl: METAPHOR_FRONT_PROD,
    },
  };

  return {
    props: {
      configCardValues: buildCardsContent(params),
      adminEmail: process.env.ADMIN_EMAIL,
      clusterName: process.env.CLUSTER_NAME,
      hostedZoneName: process.env.HOSTED_ZONE_NAME,
    }, // will be passed to the page component as props
  };
}
