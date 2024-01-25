import type { NextApiRequest, NextApiResponse } from 'next';
import EventSource from 'eventsource';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { API_URL = '' } = process.env;
  const { logFile } = req.query;

  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Encoding': 'none',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });
  res.flushHeaders();
  res.write('\n');

  const eventSource = new EventSource(`${API_URL}/api/v1/stream/${logFile}`);
  try {
    eventSource.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log('connection established from console api');
    });
    eventSource.addEventListener('message', (e) => {
      const { message } = JSON.parse(e.data);
      res.write(`data: ${message}\n\n`);
    });

    eventSource.addEventListener('error', (e) => {
      // eslint-disable-next-line no-console
      console.log('An error ocurred in the stream logs ', e);
      eventSource.close();
      res.status(500).send('An error ocurred in the stream logs');
    });
  } catch (error) {
    res.status(500).send('An error ocurred in the stream logs');
    eventSource.close();
  }
}
