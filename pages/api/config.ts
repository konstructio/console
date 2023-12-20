import type { NextApiRequest, NextApiResponse } from 'next';

import { getEnvVars } from '@/app/lib/common';
import { EnvironmentVariables } from '@/types/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvironmentVariables>,
) {
  const config = await getEnvVars();

  res.status(200).json(config);
}
