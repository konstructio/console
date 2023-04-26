import EventEmitter from 'events';

export function createLogStream(url: string): EventEmitter | Error {
  const logStream = new EventEmitter();
  let sse: EventSource | null = null;

  async function startLogStream() {
    const eventSource = new EventSource(url);
    sse = eventSource;

    console.log('starting');

    eventSource.addEventListener('open', (e) => {
      console.log('connection established');
    });
    eventSource.addEventListener('log', (e) => {
      const logMessage = JSON.parse(e.data);
      logStream.emit('log', logMessage);
    });
    eventSource.addEventListener('message', (e) => {
      const logMessage = JSON.parse(e.data);
      logStream.emit('log', logMessage);
    });

    eventSource.addEventListener('error', (e) => {
      console.error('an error occurred', e);
      logStream.emit('error', e);
    });
  }

  function stopLogStream(): void {
    if (sse) {
      sse.close(); // closes connection
    }
    logStream.removeAllListeners(); // removes all event listeners
  }

  return Object.assign(logStream, { startLogStream, stopLogStream });
}
