import React, { FunctionComponent } from 'react';
import Image from 'next/image';

import Typography from '../typography';
import Button from '../../components/button';
import boxImgSrc from '../../public/static/box.svg';

import { Container, Link, Title } from './clusterReady.styled';

const boxImageSrc = process.env.STORYBOOK_MODE ? boxImgSrc : '/static/box.svg';

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
    <Image alt="box" src={boxImageSrc} width={170} height={160} />
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
