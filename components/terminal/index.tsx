import React, { ChangeEvent, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { SearchAddon } from 'xterm-addon-search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OutlinedInput } from '@mui/material';

import 'xterm/css/xterm.css';

const DATE_REGEX = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;

import { Container, Search, TerminalView } from './terminal.styled';
import logs from './logs';

const SEARCH_OPTIONS = { caseSensitive: false };

const Terminal: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const terminalRef = useRef(null);
  const terminal = useMemo(
    () =>
      new XTerminal({
        logLevel: 'off',
        convertEol: true,
        cols: 100,
        scrollback: 5000,
        theme: {
          background: '#0F172A',
        },
      }),
    [],
  );

  const searchAddon = useMemo(() => new SearchAddon(), []);
  searchAddon.onDidChangeResults((result) => {
    // eslint-disable-next-line no-console
    console.log(result);
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchAddon.findPrevious(value, SEARCH_OPTIONS);
    setSearchTerm(value);
  };

  const handleSearchNext = () => {
    searchAddon.findNext(searchTerm, SEARCH_OPTIONS);
  };

  const handleSearchPrev = () => {
    searchAddon.findPrevious(searchTerm, SEARCH_OPTIONS);
  };

  useEffect(() => {
    terminal.loadAddon(searchAddon);

    if (terminalRef.current) {
      // Creates the terminal within the container element.
      terminal.open(terminalRef.current);
      terminal.write('Hello there \n');
      let i = 0;
      setInterval(() => {
        if (i <= logs.length) {
          terminal.write(`${logs[i]}\n`.replace(DATE_REGEX, '\x1b[0;37m$1\x1B[0m'));
          i++;
          // terminal.write(`${new Date().toISOString()}: INF: Hello Kubefirst \n`);
        }
      }, 1000);
    }

    return () => terminal.dispose();
  }, [searchAddon, terminal]);

  return (
    <Container>
      <TerminalView ref={terminalRef} />
      <Search>
        <OutlinedInput
          placeholder="Search"
          onChange={handleSearch}
          size="small"
          sx={{ color: 'white' }}
          inputProps={{ color: 'white' }}
        />
        <KeyboardArrowDownIcon color="secondary" onClick={handleSearchNext} />
        <KeyboardArrowUpIcon color="secondary" onClick={handleSearchPrev} />
      </Search>
    </Container>
  );
};

export default Terminal;
