import React, { FunctionComponent } from 'react';
import Image from 'next/image';

import Typography from '../typography';
import boxImgSrc from '../../public/static/box.svg';
import Button from '../button';

import { Container, Description, Link, Title } from './clusterRunningMessage.styled';

const boxImageSrc = process.env.STORYBOOK_MODE ? boxImgSrc : '/static/box.svg';

export interface ClusterRunningMessageProps {
  clusterName: string;
  domainName: string;
  onDeleteCluster: () => void;
}

const ClusterRunningMessage: FunctionComponent<ClusterRunningMessageProps> = ({
  clusterName,
  domainName,
  onDeleteCluster,
}) => (
  <Container>
    <Image alt="box" src={boxImageSrc} width={170} height={160} />
    <Title>
      <Typography variant="body1">
        Cluster <strong>{clusterName || '<cluster identifier>'}</strong> is now up and running.
      </Typography>
    </Title>
    <Description>
      <Typography variant="body2" align="center">
        Your Kubefirst Console is ready.{' '}
        <Link href={`https://kubefirst.${domainName}/services`} target="_blank">
          Take me there
        </Link>
      </Typography>
    </Description>
    <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={onDeleteCluster}>
      Delete my cluster
    </Button>
  </Container>
);

export default ClusterRunningMessage;
