import type { NextApiRequest, NextApiResponse } from 'next';

type Configs = {
  [key: string]: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Configs>) {
  const {
    ARGO_CD_URL = '',
    ARGO_WORKFLOWS_URL = '',
    ATLANTIS_URL = '',
    CLOUD = '',
    CLUSTER_ID = '',
    CLUSTER_TYPE = '',
    DOMAIN_NAME = '',
    GITHUB_PROVIDER = '',
    KUBEFIRST_VERSION = '',
    VAULT_URL = '',
    METAPHOR_FRONT_DEV = '',
    METAPHOR_FRONT_STAGING = '',
    METAPHOR_FRONT_PROD = '',
    USE_TELEMETRY = '',
  } = process.env;

  res.status(200).json({
    ARGO_CD_URL,
    ARGO_WORKFLOWS_URL,
    ATLANTIS_URL,
    CLOUD,
    CLUSTER_ID,
    CLUSTER_TYPE,
    DOMAIN_NAME,
    GITHUB_PROVIDER,
    KUBEFIRST_VERSION,
    VAULT_URL,
    METAPHOR_FRONT_DEV,
    METAPHOR_FRONT_STAGING,
    METAPHOR_FRONT_PROD,
    USE_TELEMETRY,
  });
}
