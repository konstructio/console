import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import CopyToClipboard from 'react-copy-to-clipboard';

import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Password from '../Password/Password';

import { Container, Link, PasswordContainer, Title } from './ClusterProReady.styled';

import Box from '@/assets/box.svg';
import { PRIMARY } from '@/constants/colors';

export interface ClusterRunningMessageProps {
  clusterName?: string;
  domainName?: string;
  kbotPassword?: string;
  cloudProvider?: string;
}

const ClusterProReady: FunctionComponent<ClusterRunningMessageProps> = ({
  clusterName,
  domainName,
  kbotPassword,
  cloudProvider,
}) => {
  const [copyLabel, setCopyLabel] = useState<string>('Copy');

  const handleOnCopy = () => {
    setCopyLabel('Copied!');

    setTimeout(() => setCopyLabel('Copy'), 3000);
  };

  return (
    <Container>
      <Title variant="h6">
        Your management cluster {clusterName || '<cluster identifier>'} is now up and running!
      </Title>
      <Image alt="kbot" src={Box} width={170} height={160} />
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 5, maxWidth: '470px' }}>
        Simply copy your
        <Link
          href={`https://kubefirst.konstruct.io/docs/${cloudProvider}/quick-start/install/ui#step-2-install-your-kubefirst-management-cluster`}
          target="_blank"
          style={{ color: PRIMARY, padding: '0 4px' }}
        >
          KBot
        </Link>
        password below, then click Open Kubefirst Pro to access the platform.
      </Typography>
      <PasswordContainer>
        <Password value={kbotPassword} sx={{ width: '100%' }} />
        <CopyToClipboard text={kbotPassword as string} onCopy={handleOnCopy}>
          <Button color="text" variant="text">
            {copyLabel}
          </Button>
        </CopyToClipboard>
      </PasswordContainer>
      <Link href={`https://kubefirst.${domainName}/`} target="_blank">
        <Button variant="contained" color="primary" data-test-id="launch-console">
          Open Kubefirst Pro
        </Button>
      </Link>
    </Container>
  );
};

export default ClusterProReady;
