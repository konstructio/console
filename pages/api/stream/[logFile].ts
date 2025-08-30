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
  
  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(':heartbeat\n\n');
  }, 30000); // Send heartbeat every 30 seconds

  // Cleanup function
  const cleanup = () => {
    clearInterval(heartbeat);
    eventSource.close();
  };

  // Handle client disconnect
  req.on('close', () => {
    // eslint-disable-next-line no-console
    console.log('Client disconnected');
    cleanup();
  });

  try {
    eventSource.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log('connection established from console api');
    });
    
    eventSource.addEventListener('message', (e: MessageEvent) => {
      try {
        const { message } = JSON.parse(e.data);
        res.write(`data: ${message}\n\n`);
      } catch (parseError) {
        // eslint-disable-next-line no-console
        console.error('Error parsing message:', parseError);
        // Send raw data if JSON parsing fails
        res.write(`data: ${e.data}\n\n`);
      }
    });

    eventSource.addEventListener('error', (e: Event) => {
      // eslint-disable-next-line no-console
      console.log('An error occurred in the stream logs:', e);
      // Send error event to client
      res.write(`event: error\ndata: ${JSON.stringify({ error: 'Stream connection error' })}\n\n`);
      cleanup();
      res.end();
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Stream handler error:', error);
    cleanup();
    res.end();
  }
}
