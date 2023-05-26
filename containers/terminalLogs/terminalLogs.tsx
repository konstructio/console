import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { Box, Tabs, tabsClasses } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Tooltip from '../../components/tooltip';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import ConciseLogs from '../conciseLogs';
import { createLogStream } from '../../services/stream';
import { getCluster } from '../../redux/thunks/api.thunk';
import { clearError, setError } from '../../redux/slices/installation.slice';
import { setCompletedSteps } from '../../redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ClusterRequestProps } from '../../types/provision';
import { CLUSTER_CHECKS } from '../../constants/cluster';
import { ECHO_BLUE, LIBERTY_BLUE } from '../../constants/colors';

import { Container, Search, SearchTextField, TerminalView, Tools } from './terminalLogs.styled';

import 'xterm/css/xterm.css';

const SEARCH_OPTIONS = { caseSensitive: false };

enum TERMINAL_TABS {
  CONCISE = 0,
  VERBOSE = 1,
}

const TerminalLogs: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [logs, setLogs] = useState<Array<string>>([]);

  const terminalRef = useRef(null);
  const searchAddonRef = useRef<SearchAddon>();
  const interval = useRef<NodeJS.Timer>();
  const dispatch = useAppDispatch();
  const {
    config: { apiUrl = '' },
    api: {
      isProvisioned,
      isProvisioning,
      isError,
      lastErrorCondition,
      selectedCluster,
      completedSteps,
    },
    installation: { values },
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

  const loadAddons = useCallback((terminal: XTerminal) => {
    if (terminal) {
      const searchAddon = new SearchAddon();
      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);
      terminal.loadAddon(searchAddon);
      searchAddonRef.current = searchAddon;
    }
  }, []);

  const getClusterInterval = (params: ClusterRequestProps) => {
    return setInterval(async () => {
      dispatch(getCluster(params)).unwrap();
    }, 5000);
  };

  useEffect(() => {
    const clusterName = values?.clusterName;
    if (isProvisioning && !isProvisioned && clusterName) {
      interval.current = getClusterInterval({ apiUrl, clusterName });
    }

    if (isProvisioned) {
      clearInterval(interval.current);
    }

    if (isError) {
      dispatch(setError({ error: lastErrorCondition }));
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProvisioning, isProvisioned, isError]);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new XTerminal({
        convertEol: true,
        cols: 110,
        disableStdin: true,
        logLevel: 'off',
        scrollback: 5000,
        theme: {
          background: LIBERTY_BLUE,
        },
      });

      loadAddons(terminal);

      terminal.open(terminalRef.current);

      const emitter = createLogStream(`${apiUrl}/stream`);
      emitter.on('log', (log) => {
        if (
          log.message.includes('time=') &&
          log.message.includes('level=') &&
          log.message.includes('msg=')
        ) {
          const [, time] = log.message.match(/time="([^"]*)"/);
          const [, level] = log.message.match(/level=([^"]*)/);
          const [, msg] = log.message.match(/msg="([^"]*)"/);

          const logLevel = level.replace(' msg=', '').toUpperCase();
          const logStyle = logLevel.includes('ERROR') ? '\x1b[1;31m' : '\x1b[0;34m';

          terminal.write(`\x1b[0;37m${time} ${logStyle}${logLevel}:\x1b[1;37m ${msg} \n`);

          setLogs((logs) => [...logs, `${time} ${logLevel} ${msg} \n`]);
        }
      });

      emitter.on('error', () => {
        emitter.stopLogStream();
      });

      emitter.startLogStream();

      // const tempLogs = [];
      // setInterval(() => {
      //   tempLogs.push(`\x1b[0;37m 2023-05-05 \x1b[0;34m INFO:\x1b[1;37m Hey Kubefirst \n`);
      //   setLogs(tempLogs);
      //   terminal.write(`\x1b[0;37m 2023-05-05 \x1b[0;34m INFO:\x1b[1;37m Hey Kubefirst \n`);
      // }, 5000);

      return () => {
        terminal.dispose();
        emitter.stopLogStream();
      };
    }
  }, [apiUrl, loadAddons]);

  useEffect(() => {
    Object.keys(CLUSTER_CHECKS).forEach((checkKey) => {
      const step = CLUSTER_CHECKS[checkKey as string];
      const isStepCompleted = selectedCluster?.checks[checkKey];
      const isStepAdded = completedSteps.find(({ label }) => label === step.label);

      if (isStepCompleted && !isStepAdded?.label) {
        dispatch(setCompletedSteps([...completedSteps, step]));
      }
    });
  }, [completedSteps, dispatch, selectedCluster?.checks]);

  return (
    <Container>
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
          <Tab label="Concise" {...a11yProps(TERMINAL_TABS.CONCISE)} />
          <Tab label="Verbose" {...a11yProps(TERMINAL_TABS.VERBOSE)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={TERMINAL_TABS.CONCISE}>
        <ConciseLogs completedSteps={completedSteps} />
      </TabPanel>
      <TabPanel value={activeTab} index={TERMINAL_TABS.VERBOSE}>
        <TerminalView ref={terminalRef} />
      </TabPanel>

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
        <CopyToClipboard text={logs.join('\n')}>
          <Tooltip title="Copy" placement="top">
            <ContentCopyIcon htmlColor={ECHO_BLUE} />
          </Tooltip>
        </CopyToClipboard>
        {/* <OpenInFullIcon htmlColor={ECHO_BLUE} /> */}
      </Tools>
    </Container>
  );
};

export default TerminalLogs;
