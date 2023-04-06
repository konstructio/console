import React, { FC } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import styled from 'styled-components';

import Typography from '../typography';
import Column from '../Column/Column';
import boxImgSrc from '../../public/static/box.svg';

const boxImageSrc = process.env.STORYBOOK_MODE ? boxImgSrc : '/static/box.svg';

const ClusterRunningMessage: FC = (props) => (
  <Column {...props}>
    <Image alt="box" src={boxImageSrc} width={170} height={160} />
    <Title>
      <Typography variant="body1">
        Cluster <Strong>{'<cluster identifier>'}</Strong> is now up and running.
      </Typography>
    </Title>
    <Description>
      <Typography variant="body2" align="center">
        You’ll now be able to add and manage clusters, in addition to adding team members.{' '}
        <Link href="#">Here’s how</Link>
      </Typography>
    </Description>
  </Column>
);

export default styled(ClusterRunningMessage)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  align-items: center;
  width: 100%;
`;

export const Description = styled.div`
  width: 378px;
`;

const Strong = styled.strong`
  font-size: 16px;
`;

export const Link = styled(NextLink)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const Title = styled.div`
  margin: 40px 0 16px 0;
  width: 382px;
`;
