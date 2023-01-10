import React, { FunctionComponent } from 'react';
import Image from 'next/image';

import Typography from '../../../../components/typography';

import { Container, Description, Link, Title } from './localReady.styled';

const LocalReady: FunctionComponent = () => {
  return (
    <Container>
      <Image alt="box" src="/static/box.svg" width={170} height={160} />
      <Title>
        <Typography variant="body1">
          Cluster <strong style={{ fontSize: 16 }}>{'<cluster identifier>'}</strong> is now up and
          running.
        </Typography>
      </Title>
      <Description>
        <Typography variant="body2" align="center">
          You’ll now be able to add and manage clusters, in addition to adding team members.{' '}
          <Link href="#">Here’s how</Link>
        </Typography>
      </Description>
    </Container>
  );
};

export default LocalReady;
