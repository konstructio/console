import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { API_URL = '' } = process.env;
  const { body, url } = req.body;
  const { url: queryUrl } = req.query;

  if (!API_URL) {
    return res.status(200).json('API_URL not provided');
  }

  const kubefirstEndpointUrl = `${API_URL}${queryUrl || url}`;

  // eslint-disable-next-line no-console
  console.log(`METHOD: ${req.method} URL: ${kubefirstEndpointUrl}`);
  try {
    const response = await axios({ url: kubefirstEndpointUrl, data: body, method: req.method });
    res.status(200).json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send(error?.response?.data || error?.message);
  }
}
