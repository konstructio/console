import type { NextApiRequest, NextApiResponse } from 'next';

type Configs = {
  [key: string]: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Configs>) {
  const { API_URL = '', KUBEFIRST_VERSION = '', DISABLE_TELEMETRY = '' } = process.env;

  res.status(200).json({
    API_URL,
    KUBEFIRST_VERSION,
    DISABLE_TELEMETRY,
  });
}
