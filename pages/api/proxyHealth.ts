import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { API_URL = '' } = process.env;

  if (!API_URL) {
    return res.status(200).json('API_URL not provided');
  }

  const response = await axios.get(`${API_URL}/api/v1/health`);
  res.status(200).json(response.data);
}
