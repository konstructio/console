import type { NextApiRequest, NextApiResponse } from 'next';

type Configs = {
  [key: string]: string | boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Configs>) {
  const {
    API_URL = '',
    CLUSTER_ID = '',
    CLUSTER_TYPE = '',
    DISABLE_TELEMETRY = '',
    INSTALL_METHOD = '',
    IS_CLUSTER_ZERO = '',
    KUBEFIRST_VERSION = '',
    POSTHOG_KEY = '',
  } = process.env;

  res.status(200).json({
    API_URL,
    CLUSTER_ID,
    CLUSTER_TYPE,
    disableTelemetry: DISABLE_TELEMETRY === 'true',
    isClusterZero: IS_CLUSTER_ZERO === 'true',
    kubefirstVersion: KUBEFIRST_VERSION,
    installMethod: INSTALL_METHOD,
    POSTHOG_KEY,
  });
}
