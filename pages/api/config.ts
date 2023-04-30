import type { NextApiRequest, NextApiResponse } from 'next';

type Configs = {
  [key: string]: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Configs>) {
  const {
    API_URL = '',
    ARGO_CD_URL = '',
    ARGO_WORKFLOWS_URL = '',
    ATLANTIS_URL = '',
    CLOUD = '',
    CLUSTER_ID = '',
    CLUSTER_TYPE = '',
    DOMAIN_NAME = '',
    GIT_PROVIDER = '',
    GITHUB_OWNER = '',
    GITLAB_OWNER = '',
    KUBEFIRST_VERSION = '',
    VAULT_URL = '',
    METAPHOR_DEVELOPMENT_URL = '',
    METAPHOR_STAGING_URL = '',
    METAPHOR_PRODUCTION_URL = '',
    USE_TELEMETRY = '',
  } = process.env;

  res.status(200).json({
    API_URL,
    ARGO_CD_URL,
    ARGO_WORKFLOWS_URL,
    ATLANTIS_URL,
    CLOUD,
    CLUSTER_ID,
    CLUSTER_TYPE,
    DOMAIN_NAME,
    GIT_PROVIDER,
    GITHUB_OWNER,
    GITLAB_OWNER,
    KUBEFIRST_VERSION,
    VAULT_URL,
    METAPHOR_DEVELOPMENT_URL,
    METAPHOR_STAGING_URL,
    METAPHOR_PRODUCTION_URL,
    USE_TELEMETRY,
  });
}
