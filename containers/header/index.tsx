'use client';
import React, { FunctionComponent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';

import { Container } from './header.styled';

import { setSelectedCluster } from '@/redux/slices/cluster.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

function stringAvatar(name?: string | null) {
  return {
    sx: {
      bgcolor: '#FAFAFA',
      color: '#94A3B8',
    },
    children: `${name && name[0]}`,
  };
}

const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { managementCluster } = useAppSelector(({ api }) => api);

  useEffect(() => {
    if (managementCluster && managementCluster.id) {
      dispatch(setSelectedCluster(managementCluster));
    }
  }, [dispatch, managementCluster]);

  return (
    <Container>{session?.user && <Avatar {...stringAvatar(session?.user?.email)} />}</Container>
  );
};

export default Header;
