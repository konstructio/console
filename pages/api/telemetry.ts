// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendTelemetry } from 'services/telemetry';

export type TelemetryResponseData = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<TelemetryResponseData>) {
  try {
    if (req.method === 'POST') {
      const { event, properties } = req.body;
      sendTelemetry(event, properties);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: sending segment event', error);
  }

  res.status(200).json({ success: true });
}
