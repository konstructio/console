import React, { FunctionComponent } from 'react';
import Image from 'next/image';

import Typography from '../typography';
import Button from '../../components/button';

import { Container, Link, Title } from './clusterReady.styled';

export interface ClusterRunningMessageProps {
  clusterName?: string;
  domainName?: string;
  onOpenConsole: () => void;
}

const ClusterReady: FunctionComponent<ClusterRunningMessageProps> = ({
  clusterName,
  domainName,
  onOpenConsole,
}) => (
  <Container>
    <Image alt="box" src="/static/box.svg" width={170} height={160} />
    <Title>
      <Typography variant="body1">
        Cluster <strong>{clusterName || '<cluster identifier>'}</strong> is now up and running.
      </Typography>
    </Title>
    <Button variant="contained" color="primary">
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

export default ClusterReady;
