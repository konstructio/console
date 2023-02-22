import https from 'https';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  url: string;
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { url } = req.body;
  try {
    if (req.method === 'POST') {
      await axios.get(url, { httpsAgent: httpsAgent });
      res.status(200).json({ success: true, url });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    res.status(200).json({ success: false, url });
  }
}
