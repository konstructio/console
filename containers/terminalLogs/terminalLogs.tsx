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

import ConciseLogs from '../conciseLogs/index';

import { Container, Search, TabContainer, TerminalView } from './terminalLogs.styled';
import logs from './logs';

import 'xterm/css/xterm.css';

const SEARCH_OPTIONS = { caseSensitive: false };
const DATE_REGEX = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;

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

    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      terminal.write('Hello \n');

      let i = 0;
      setInterval(() => {
        if (i <= logs.length) {
          terminal.write(`${logs[i]}\n`.replace(DATE_REGEX, '\x1b[0;37m$1\x1B[0m'));
          i++;
          // terminal.write(`${new Date().toISOString()}: INF: Hello Kubefirst \n`);
        }
      }, 1000);

      loadAddons(terminal);
    }

    return () => terminal.dispose();
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
