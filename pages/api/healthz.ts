// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { machineIdSync } from 'node-machine-id';
import Analytics from 'analytics-node';

type Data = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const analytics = new Analytics('0gAYkX5RV3vt7s4pqCOOsDb6WHPLT30M');

    const userId = process.env.HOSTED_ZONE_NAME || machineIdSync();
    analytics.identify({
      userId: userId,
    });

    analytics.track({
      userId: userId,
      event: 'kubefirst.console.healthz',
      properties: {
        cli_version: process.env.KUBEFIRST_VERSION,
        domain: userId,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: sending segment event');
  }

  res.status(200).json({ success: true });
}
