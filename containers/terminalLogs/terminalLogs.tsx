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
import { getCluster } from '../../redux/thunks/cluster';
import { ClusterProps } from '../../types/provision';
import { setInstallationStep } from '../../redux/slices/installation.slice';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import FlappyKray from '../../components/flappyKray';

import { Close, Container, Search, TerminalView } from './terminalLogs.styled';

import 'xterm/css/xterm.css';

const DATE_REGEX = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;
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
    cluster: { isProvisioned, isProvisioning },
    installation: { installationStep, values },
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

  const getClusterInterval = (params: ClusterProps) => {
    return setInterval(async () => {
      dispatch(getCluster(params)).unwrap();
    }, 10000);
  };

  useEffect(() => {
    const clusterName = values?.clusterName as string;
    if (isProvisioning && !isProvisioned && clusterName) {
      interval.current = getClusterInterval({ apiUrl, clusterName });
    }

    if (isProvisioned) {
      dispatch(setInstallationStep(installationStep + 1));
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProvisioning, isProvisioned]);

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
        terminal.write(`${log.message.replace(DATE_REGEX, '\x1b[0;37m$1\x1B[0m')}\n`);
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
        <ConciseLogs />
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
      {isOpen && <FlappyKray isOpen={isOpen} closeModal={closeModal} />}
      {isYouTubeOpen && (
        <Modal isModalVisible>
          <>
            <iframe
              src="https://www.youtube.com/embed/moBZzQtr-AE"
              title="Kubefirst Channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              style={{
                border: 0,
                height: '600px',
                width: '800px',
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
