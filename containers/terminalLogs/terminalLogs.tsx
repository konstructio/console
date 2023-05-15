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
import { Box, Tabs } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { OutlinedInput } from '@mui/material';
import { SearchAddon } from 'xterm-addon-search';

import { createLogStream } from '../../services/stream';
import ConciseLogs from '../conciseLogs';
import useModal from '../../hooks/useModal';
import Modal from '../../components/modal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getCluster } from '../../redux/thunks/cluster.thunk';
import { ClusterRequestProps } from '../../types/provision';
import { clearError, setError } from '../../redux/slices/installation.slice';
import { setCompletedSteps } from '../../redux/slices/cluster.slice';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import FlappyKray from '../../components/flappyKray';
import { CLUSTER_CHECKS } from '../../constants/cluster';

import { Close, Container, Search, TerminalView } from './terminalLogs.styled';

import 'xterm/css/xterm.css';

const SEARCH_OPTIONS = { caseSensitive: false };

enum TERMINAL_TABS {
  CONCISE = 0,
  VERBOSE = 1,
}

const TerminalLogs: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const terminalRef = useRef(null);
  const searchAddonRef = useRef<SearchAddon>();
  const interval = useRef<NodeJS.Timer>();
  const dispatch = useAppDispatch();
  const {
    config: { apiUrl = '' },
    cluster: {
      isProvisioned,
      isProvisioning,
      isError,
      lastErrorCondition,
      selectedCluster,
      completedSteps,
    },
    installation: { values },
  } = useAppSelector(({ config, cluster, installation }) => ({
    installation,
    config,
    cluster,
  }));

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isYouTubeOpen,
    openModal: openYouTubeModal,
    closeModal: closeYouTubeModal,
  } = useModal();

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

      const emitter = createLogStream(`${apiUrl}/stream`);
      emitter.on('log', (log) => {
        const [, time] = log.message.match(/time="([^"]*)"/);
        const [, level] = log.message.match(/level=([^"]*)/);
        const [, msg] = log.message.match(/msg="([^"]*)"/);

        const logLevel = level.replace(' msg=', '').toUpperCase();
        const logStyle = logLevel.includes('ERROR') ? '\x1b[1;31m' : '\x1b[0;34m';

        terminal.write(`\x1b[0;37m${time} ${logStyle}${logLevel}:\x1b[1;37m ${msg} \n`);
      });

      emitter.on('error', () => {
        emitter.stopLogStream();
      });

      emitter.startLogStream();

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

      {activeTab === TERMINAL_TABS.VERBOSE && (
        <Search>
          <SportsEsportsIcon color="secondary" onClick={openModal} />
          <LiveTvIcon color="secondary" onClick={openYouTubeModal} />
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
      {isOpen && <FlappyKray isOpen closeModal={closeModal} />}
      {isYouTubeOpen && (
        <Modal isOpen backgroundColor="transparent" boxShadow={false}>
          <>
            <iframe
              src="https://www.youtube.com/embed/moBZzQtr-AE"
              title="Kubefirst Channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              style={{
                border: 0,
                height: '600px',
                width: '1000px',
              }}
            />
            <Close onClick={closeYouTubeModal} color="secondary" fontSize="large" />
          </>
        </Modal>
      )}
    </Container>
  );
};

export default TerminalLogs;
