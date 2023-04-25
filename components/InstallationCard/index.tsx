import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import Typography from '../typography';
import { CardOptionInfo } from '../../types';

import { Card, CardTitle, CardDescription } from './installationCard.styled';

export interface InstallationCardProps extends ComponentPropsWithoutRef<'div'> {
  active: boolean;
  info: CardOptionInfo;
}

const InstallationCard: FunctionComponent<InstallationCardProps> = ({ active, info, ...rest }) => (
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

export default InstallationCard;
