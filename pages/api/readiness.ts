import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { url } = req.body;
  try {
    if (req.method === 'POST') {
      await axios.get(url);
      res.status(200).json({ success: true, url });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    res.status(200).json({ success: false, url });
  }
}
