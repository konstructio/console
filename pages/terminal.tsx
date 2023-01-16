import React, { FunctionComponent } from 'react';

import TerminalLogs from '../containers/terminalLogs';

export interface TerminalLogsPageProps {
  children: FunctionComponent;
}

const TerminalLogsPage: FunctionComponent<TerminalLogsPageProps> = () => <TerminalLogs />;

export default TerminalLogsPage;
