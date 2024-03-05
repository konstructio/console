import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const API_TARGET_ID = 'api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { API_URL = '', ENTERPRISE_API_URL = '', K1_ACCESS_TOKEN = '' } = process.env;
  const { body, url } = req.body;
  const { url: queryUrl, target = API_TARGET_ID } = req.query;

  if (!API_URL) {
    return res.status(200).json('API_URL not provided');
  }

  const apiBaseUrl = target === API_TARGET_ID ? API_URL : ENTERPRISE_API_URL;

  // eslint-disable-next-line no-console
  console.log('BASE URL:', apiBaseUrl);

  const kubefirstEndpointUrl = `${apiBaseUrl}/api/v1${queryUrl || url}`;

  // eslint-disable-next-line no-console
  console.log(`METHOD: ${req.method} URL: ${kubefirstEndpointUrl}`);
  try {
    const response = await axios({
      url: kubefirstEndpointUrl,
      data: body,
      method: req.method,
      headers: {
        Authorization: `Bearer ${K1_ACCESS_TOKEN}`,
      },
    });

    res.status(response.status).json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(error?.response?.status || 500).send(error?.response?.data || error?.message);
  }
}
