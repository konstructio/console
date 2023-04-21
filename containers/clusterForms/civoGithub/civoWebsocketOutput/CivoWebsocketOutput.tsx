import React, { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface Props {
  socket: WebSocket;
}

const Terminal: React.FC<Props> = ({ socket }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<XTerminal | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      // Create a new terminal instance
      const newTerminal = new XTerminal({
        cursorBlink: true,
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
        },
      });

      // Add a fit addon to ensure the terminal fits within its container
      const fitAddon = new FitAddon();
      newTerminal.loadAddon(fitAddon);

      // Attach the terminal instance to the DOM
      newTerminal.open(terminalRef.current);

      // Attach event listeners to the WebSocket instance
      socket.addEventListener('open', () => {
        console.log('WebSocket connection opened');
      });

      socket.addEventListener('message', (event) => {
        if (newTerminal) {
          newTerminal.write(event.data);
        }
      });

      socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
      });

      // Save the terminal instance to the ref
      terminal.current = newTerminal;
    }

    return () => {
      if (terminal.current) {
        terminal.current.dispose();
        terminal.current = null;
      }
    };
  }, [socket]);

  return <div ref={terminalRef} style={{ height: '400px' }} />;
};

export default Terminal;
