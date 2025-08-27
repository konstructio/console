
I'll add all my entire suggestion here for your convenience:

✅ cheking attemps exists some error and the attemp count doesn't work, always show 1/10

I just move the connectToStream outside the useEffect taking care of context and simplifying the use

 useEffect(() => {
    if (terminalRef.current && managementCluster?.logFile) {
      const terminal = new XTerminal({
        convertEol: true,
        cols: 105,
        disableStdin: true,
        logLevel: 'off',
        scrollback: 5000,
        theme: {
          foreground: 'white',
          background: LIBERTY_BLUE,
        },
      });

      loadAddons(terminal);
      terminal.open(terminalRef.current);
      terminalInstanceRef.current = terminal;

      setLogs([]);

      const cleanup = connectToStream({
        terminal,
        logFile: managementCluster.logFile,
        setLogs,
      });

      return () => {
        cleanup();
        terminal.dispose();
      };
    }
CleanShot 2025-08-07 at 00 16 49
All code here ☟

import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import CopyToClipboard from 'react-copy-to-clipboard';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import ConciseLogs from '../ConciseLogs/ConciseLogs';

import {
  Container,
  Search,
  SearchTextField,
  TerminalHead,
  TerminalView,
  Tools,
} from './TerminalLogs.styled';

import Tooltip from '@/components/Tooltip/Tooltip';
import TabPanel, { Tab, a11yProps } from '@/components/Tab/Tab';
import { setCompletedSteps } from '@/redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CLUSTER_CHECKS } from '@/constants/cluster';
import { ANSI_COLORS, ECHO_BLUE, LIBERTY_BLUE } from '@/constants/colors';
import { parseJSON } from '@/utils/isJson';

import 'xterm/css/xterm.css';

const UNSCAPE_STRING_REGEX = /\\x([0-9A-Fa-f]{2})/g;
const SEARCH_OPTIONS = { caseSensitive: false };

const { brightRed, darkBlue, gray, brightWhite } = ANSI_COLORS;

enum TERMINAL_TABS {
  CONCISE = 0,
  VERBOSE = 1,
}

function connectToStream({
  terminal,
  logFile,
  setLogs,
  maxReconnectAttempts = 10,
  reconnectDelay = 3000,
}: {
  terminal: XTerminal;
  logFile: string;
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
}) {
  let eventSource: EventSource | null = null;
  let reconnectTimer: NodeJS.Timeout | null = null;
  let reconnectAttempts = 0;
  let isInitialConnection = true;
  let hasReceivedData = false;

  const connect = () => {
    if (eventSource) {
      eventSource.close();
    }

    terminal.writeln(`${gray}Connecting to stream...${brightWhite}`);
    eventSource = new EventSource(`/api/stream/${logFile}`);
    hasReceivedData = false;

    eventSource.addEventListener('open', () => {
      if (isInitialConnection) {
        terminal.writeln(`${gray}Stream connected.${brightWhite}`);
        isInitialConnection = false;
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    });

    eventSource.addEventListener('message', (e) => {
      if (!hasReceivedData && reconnectAttempts > 0) {
        terminal.writeln(`${gray}Connection restored successfully.${brightWhite}`);
        reconnectAttempts = 0;
      }
      hasReceivedData = true;

      const { isValid, value: log } = parseJSON(e.data);
      if (!isValid) {
        return terminal.writeln(log);
      }

      if (log.message) {
        const { message, level, time } = log;
        const logLevel = level.toUpperCase();
        const logStyle = logLevel.includes('ERR') ? brightRed : darkBlue;

        const decodedMessage = message
          .replace(UNSCAPE_STRING_REGEX, (_: never, hex: string) =>
            String.fromCharCode(parseInt(hex, 16)),
          )
          .replaceAll('\x1B[1m', brightWhite);

        let localTime = time;
        if (moment(time).isValid()) {
          localTime = moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
        }

        terminal.writeln(
          `${gray}${localTime} ${logStyle}${logLevel}:${brightWhite} ${decodedMessage}`,
        );
        setLogs((prev) => [...prev, `${localTime} ${level} ${decodedMessage} \n`]);
      }
    });

    eventSource.addEventListener('error', (e: Event) => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }

      if (e.type === 'error' && (e as MessageEvent).data) {
        try {
          const errorData = JSON.parse((e as MessageEvent).data);
          terminal.writeln(`${brightRed}Stream error: ${errorData.error}${brightWhite}`);
        } catch {
          // Ignore parse errors
        }
      }

      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        terminal.writeln(
          `${gray}Connection lost. Reconnecting (attempt ${reconnectAttempts}/${maxReconnectAttempts})...${brightWhite}`,
        );

        reconnectTimer = setTimeout(connect, reconnectDelay);
      } else {
        terminal.writeln(
          `${brightRed}Failed to reconnect after ${maxReconnectAttempts} attempts. Please refresh the page.${brightWhite}`,
        );
      }
    });
  };

  connect();

  return () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    if (eventSource) {
      eventSource.close();
    }
  };
}

const TerminalLogs: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [logs, setLogs] = useState<Array<string>>([]);

  const terminalRef = useRef(null);
  const terminalInstanceRef = useRef<XTerminal>();
  const searchAddonRef = useRef<SearchAddon>();
  const dispatch = useAppDispatch();
  const {
    api: { managementCluster, completedSteps },
  } = useAppSelector(({ config, api, installation }) => ({
    installation,
    config,
    api,
  }));

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchAddonRef.current?.findPrevious(value, SEARCH_OPTIONS);
    setSearchTerm(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getTextToCopy = () => {
    if (activeTab === TERMINAL_TABS.VERBOSE && terminalInstanceRef.current) {
      // Get text from XTerminal buffer for verbose tab
      const terminal = terminalInstanceRef.current;
      const buffer = terminal.buffer.active;
      let text = '';

      for (let i = 0; i < buffer.length; i++) {
        const line = buffer.getLine(i);
        if (line) {
          text += `${line.translateToString(true)}\n`;
        }
      }

      return text.trim();
    } else {
      // Use logs array for concise tab
      return logs.join('\n');
    }
  };

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
    if (terminalRef.current && managementCluster?.logFile) {
      const terminal = new XTerminal({
        convertEol: true,
        cols: 105,
        disableStdin: true,
        logLevel: 'off',
        scrollback: 5000,
        theme: {
          foreground: 'white',
          background: LIBERTY_BLUE,
        },
      });

      loadAddons(terminal);
      terminal.open(terminalRef.current);
      terminalInstanceRef.current = terminal;

      setLogs([]);

      const cleanup = connectToStream({
        terminal,
        logFile: managementCluster.logFile,
        setLogs,
      });

      return () => {
        cleanup();
        terminal.dispose();
      };
    }
  }, [loadAddons, managementCluster?.logFile]);

  useEffect(() => {
    if (managementCluster && managementCluster?.checks) {
      Object.keys(CLUSTER_CHECKS).forEach((checkKey) => {
        const step = CLUSTER_CHECKS[checkKey];
        const isStepCompleted = managementCluster?.checks[checkKey];
        const isStepAdded = completedSteps.find(({ label }) => label === step.label);

        if (isStepCompleted && !isStepAdded?.label) {
          dispatch(setCompletedSteps([...completedSteps, step]));
        }
      });
    }
  }, [completedSteps, dispatch, managementCluster]);

  return (
    <Container>
      <TerminalHead>
        <Box>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              [`.${tabsClasses.scroller}`]: {
                height: 30,
              },
            }}
          >
            <Tab
              label="Concise"
              {...a11yProps(TERMINAL_TABS.CONCISE)}
              sx={{ minHeight: 'auto !important' }}
            />
            <Tab
              label="Verbose"
              {...a11yProps(TERMINAL_TABS.VERBOSE)}
              sx={{ minHeight: 'auto !important' }}
            />
          </Tabs>
        </Box>
        <Tools>
          <Search>
            <SearchIcon htmlColor={ECHO_BLUE} />
            <SearchTextField
              placeholder="Search"
              onChange={handleSearch}
              size="small"
              fullWidth
              value={searchTerm}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  searchAddonRef.current?.findNext(searchTerm, SEARCH_OPTIONS);
                }
              }}
            />
          </Search>
          <Tooltip title="Help documentation" placement="top">
            <HelpOutlineIcon htmlColor={ECHO_BLUE} />
          </Tooltip>
          <CopyToClipboard text={getTextToCopy()}>
            <Tooltip title="Copy" placement="top">
              <ContentCopyIcon htmlColor={ECHO_BLUE} />
            </Tooltip>
          </CopyToClipboard>
          {/* <OpenInFullIcon htmlColor={ECHO_BLUE} /> */}
        </Tools>
      </TerminalHead>

      <TabPanel value={activeTab} index={TERMINAL_TABS.CONCISE}>
        <ConciseLogs completedSteps={completedSteps} />
      </TabPanel>
      <TabPanel value={activeTab} index={TERMINAL_TABS.VERBOSE}>
        <TerminalView ref={terminalRef} />
      </TabPanel>
    </Container>
  );
};

export default TerminalLogs;
