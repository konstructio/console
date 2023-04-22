import { useState, useEffect } from 'react';

export function useWebSocket(url: string | URL) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [url]);

  return socket;
}
