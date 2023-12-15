import type { NextApiRequest, NextApiResponse } from 'next';
import { PostHog } from 'posthog-node';

type Configs = {
  flags: Record<string, string | boolean>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Configs | string>) {
  const { KUBEFIRST_VERSION = '', POSTHOG_KEY = '' } = process.env;

  let flags: Record<string, string | boolean> = {};
  try {
    const client = new PostHog(POSTHOG_KEY || 'phc_N4K5yJQsiIDBRK3X6rfrZlldK5uf2u1vgvlB82RADKn');
    client.identify({
      distinctId: KUBEFIRST_VERSION,
      properties: {
        version: KUBEFIRST_VERSION,
        flatVersion: parseInt(KUBEFIRST_VERSION.replace('v', '').replaceAll('.', ''), 10),
      },
    });

    flags = (await client.getAllFlags(KUBEFIRST_VERSION)) as Record<string, string | boolean>;
  } catch (error) {
    res.status(500).send('An error occurred while getting feature flags');
  }

  res.status(200).json({ flags });
}
