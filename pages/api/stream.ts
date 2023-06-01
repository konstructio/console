import type { NextApiRequest, NextApiResponse } from 'next';
import EventSource from 'eventsource';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { API_URL = '' } = process.env;

  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Encoding': 'none',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });
  res.flushHeaders();

  const eventSource = new EventSource(`${API_URL}/api/v1/stream`);

  eventSource.addEventListener('open', () => {
    // eslint-disable-next-line no-console
    console.log('connection established from console api');
  });
  eventSource.addEventListener('message', (e) => {
    res.write(`data: ${e.data}\n\n`);
  });
}
