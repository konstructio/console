import type { NextApiRequest, NextApiResponse } from 'next';

type Configs = {
  [key: string]: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Configs>) {
  const {
    ADMIN_EMAIL = '',
    CLUSTER_NAME = '',
    GITHUB_HOST = '',
    GITHUB_OWNER = '',
    HOSTED_ZONE_NAME = '',
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
    KUBEFIRST_VERSION = '',
    USE_TELEMETRY = '',
    MACHINE_ID = '',
    IS_LOCAL = '',
  } = process.env;

  res.status(200).json({
    HOSTED_ZONE_NAME,
    ADMIN_EMAIL,
    CLUSTER_NAME,
    GITHUB_HOST,
    GITHUB_OWNER,
    ARGO_WORKFLOWS_URL,
    VAULT_URL,
    ARGO_CD_URL,
    ATLANTIS_URL,
    METAPHOR_DEV,
    METAPHOR_GO_DEV,
    METAPHOR_FRONT_DEV,
    METAPHOR_STAGING,
    METAPHOR_GO_STAGING,
    METAPHOR_FRONT_STAGING,
    METAPHOR_PROD,
    METAPHOR_GO_PROD,
    METAPHOR_FRONT_PROD,
    KUBEFIRST_VERSION,
    USE_TELEMETRY,
    MACHINE_ID,
    IS_LOCAL,
  });
}
