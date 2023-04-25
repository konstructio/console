import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, styled, Tab, tabClasses, Tabs } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OutlinedInput } from '@mui/material';
import { SearchAddon } from 'xterm-addon-search';
import { FitAddon } from 'xterm-addon-fit';
import { Terminal as XTerminal } from 'xterm';
import { createLogStream } from 'services/stream';

import ConciseLogs from '../conciseLogs';

import { Container, Search, TabContainer, TerminalView } from './terminalLogs.styled';

import 'xterm/css/xterm.css';

const DATE_REGEX = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;
const SEARCH_OPTIONS = { caseSensitive: false };

enum TERMINAL_TABS {
  CONCISE = 0,
  VERBOSE = 1,
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled((props: { label: string }) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    ...theme.typography.labelMedium,
    color: '#ABADC6',
    padding: 0,
    minWidth: 'auto',
    marginRight: '12px',
    [`&.${tabClasses.selected}`]: {
      color: theme.palette.secondary.main,
    },
  }),
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TabContainer
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ visibility: value === index ? 'visible' : 'hidden' }}
      {...other}
    >
      {children}
    </TabContainer>
  );
}

const TerminalLogs: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const terminalRef = useRef(null);
  const searchAddonRef = useRef<SearchAddon>();

  const subscribe = () => {
    // const emitter: any = createLogStream('http://localhost:8081/api/v1/stream');
    const eventSource = new EventSource('http://localhost:8081/api/v1/stream');

    console.log('starting');

    eventSource.addEventListener('open', (e) => {
      console.log('connection established');
    });
    eventSource.addEventListener('log', (e) => {
      const logMessage = JSON.parse(e.data);
      console.log('logMessage', logMessage);
    });

    eventSource.addEventListener('error', (e) => {
      console.error('an error occurred', e);
    });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchAddonRef.current?.findPrevious(value, SEARCH_OPTIONS);
    setSearchTerm(value);
  };

  const handleSearchNext = () => {
    searchAddonRef.current?.findNext(searchTerm, SEARCH_OPTIONS);
  };

  const handleSearchPrev = () => {
    searchAddonRef.current?.findPrevious(searchTerm, SEARCH_OPTIONS);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const loadAddons = useCallback((terminal: XTerminal) => {
    if (terminal) {
      const searchAddon = new SearchAddon();
      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);
      terminal.loadAddon(searchAddon);
      searchAddonRef.current = searchAddon;
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new XTerminal({
        convertEol: true,
        disableStdin: true,
        logLevel: 'off',
        scrollback: 5000,
        cols: 100,
        theme: {
          background: '#0F172A',
        },
      });

      loadAddons(terminal);

      terminal.open(terminalRef.current);

      const emitter: any = createLogStream('http://localhost:8081/api/v1/stream');
      emitter.on('log', (log: any) => {
        console.log('incoming log', log);
        terminal.write(`${log.message.replace(DATE_REGEX, '\x1b[0;37m$1\x1B[0m')}\n\n`);
      });

      emitter.on('error', (error: any) => {
        console.error(error);
        emitter.stopLogStream();
      });

      emitter.startLogStream();

      return () => {
        terminal.dispose();
        emitter.stopLogStream();
      };
    }
  }, [loadAddons]);

  return (
    <Container>
      <Box>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <StyledTab label="Concise" {...a11yProps(TERMINAL_TABS.CONCISE)} />
          <StyledTab label="Verbose" {...a11yProps(TERMINAL_TABS.VERBOSE)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={TERMINAL_TABS.CONCISE}>
        <ConciseLogs />
      </TabPanel>
      <TabPanel value={activeTab} index={TERMINAL_TABS.VERBOSE}>
        <TerminalView ref={terminalRef} />
      </TabPanel>

      {activeTab === TERMINAL_TABS.VERBOSE && (
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
      )}
    </Container>
  );
};

export default TerminalLogs;
