import https from 'https';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ReadinessData = {
  success: boolean;
  url: string;
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReadinessData>) {
  const { url } = req.body;
  if (req.method === 'POST') {
    try {
      await axios.get(url, { httpsAgent: httpsAgent });
      res.status(200).json({ success: true, url });
    } catch (error) {
      res.status(200).json({ success: false, url });
    }
  }
}
