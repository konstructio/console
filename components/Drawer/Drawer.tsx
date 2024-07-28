import React, { FC, PropsWithChildren } from 'react';
import DrawerMui, { DrawerProps } from '@mui/material/Drawer';

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({ children, ...delegated }) => {
  return <DrawerMui {...delegated}>{children}</DrawerMui>;
};

export default Drawer;
