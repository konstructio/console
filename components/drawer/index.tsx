import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Drawer as DrawerMui, DrawerProps } from '@mui/material';

const Drawer: FunctionComponent<Omit<PropsWithChildren<DrawerProps>, 'key'>> = ({
  children,
  ...rest
}) => {
  return <DrawerMui {...rest}>{children}</DrawerMui>;
};

export default Drawer;
