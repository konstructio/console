import React, { ComponentPropsWithoutRef, FC } from 'react';
import styled from 'styled-components';

import Typography from '../typography';
import { CardOptionInfo } from '../../types';

import { Card, CardTitle, CardDescription } from './InstallationCard.styled';

interface InstallationCardProps extends ComponentPropsWithoutRef<'div'> {
  active: boolean;
  info: CardOptionInfo;
}

const InstallationCard: FC<InstallationCardProps> = ({ active, info, ...rest }) => (
  <Card isActive={active} {...rest}>
    <CardTitle>
      <Typography variant="h6">{info.title}</Typography>
    </CardTitle>
    <CardDescription isActive={active}>
      <Typography variant="body2" sx={{ letterSpacing: 0 }}>
        {info.description}
      </Typography>
    </CardDescription>
  </Card>
);

export default styled(InstallationCard)``;
