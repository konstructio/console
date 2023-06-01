import EventEmitter from 'events';

export interface LogStreamResponse extends NodeJS.EventEmitter {
  startLogStream: () => void;
  stopLogStream: () => void;
}

export function createLogStream(url: string): LogStreamResponse {
  const logStream = new EventEmitter();
  let sse: EventSource | null = null;

  async function startLogStream() {
    const eventSource = new EventSource(url);
    sse = eventSource;

    eventSource.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log('connection established');
    });
    eventSource.addEventListener('message', (e) => {
      const logMessage = JSON.parse(e.data);
      logStream.emit('log', logMessage);
    });

    eventSource.addEventListener('error', (e) => {
      logStream.emit('error', e);
    });
  }

  function stopLogStream(): void {
    if (sse) {
      sse.close();
    }
    logStream.removeAllListeners();
  }

  return Object.assign(logStream, { startLogStream, stopLogStream });
}
