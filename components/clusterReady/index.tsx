import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import CopyToClipboard from 'react-copy-to-clipboard';

import Typography from '../typography';
import Button from '../button';
import Password from '../password';

import { Container, Link, PasswordContainer, Title } from './clusterReady.styled';

export interface ClusterRunningMessageProps {
  clusterName?: string;
  domainName?: string;
  kbotPassword?: string;
  onOpenConsole: () => void;
}

const ClusterReady: FunctionComponent<ClusterRunningMessageProps> = ({
  clusterName,
  domainName,
  kbotPassword,
  onOpenConsole,
}) => {
  const [copyLabel, setCopyLabel] = useState<string>('Copy');

  const handleOnCopy = () => {
    setCopyLabel('Copied!');

    setTimeout(() => setCopyLabel('Copy'), 3000);
  };

  return (
    <Container>
      <Image alt="box" src="/static/box.svg" width={170} height={160} />
      <Title>
        <Typography variant="body1">
          Cluster <strong>{clusterName || '<cluster identifier>'}</strong> is now up and running.
        </Typography>
      </Title>
      <Typography variant="body2">
        Copy this k-bot password and log into the kubefirst console UI.
      </Typography>
      <PasswordContainer>
        <Password value={kbotPassword} sx={{ width: '398px' }} />
        <CopyToClipboard text={kbotPassword as string} onCopy={handleOnCopy}>
          <Button color="text" variant="text">
            {copyLabel}
          </Button>
        </CopyToClipboard>
      </PasswordContainer>
      <Button variant="contained" color="primary" data-test-id="launch-console">
        <Link
          href={`https://kubefirst.${domainName}/services`}
          target="_blank"
          onClick={onOpenConsole}
        >
          Open kubefirst console
        </Link>
      </Button>
    </Container>
  );
};

export default ClusterReady;
