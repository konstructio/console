import type { NextApiRequest, NextApiResponse } from 'next';

import { getFeatureFlags } from '@/app/lib/common';
import { FeatureFlag } from '@/types/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<FeatureFlag, boolean>>,
) {
  const flags = await getFeatureFlags();

  res.status(200).json(flags);
}
