import React, { FunctionComponent, useEffect } from 'react';

import { setSelectedCluster } from '../../redux/slices/cluster.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { Container } from './header.styled';

const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { managementCluster } = useAppSelector(({ api }) => api);

  useEffect(() => {
    if (managementCluster && managementCluster.id) {
      dispatch(setSelectedCluster(managementCluster));
    }
  }, [dispatch, managementCluster]);

  return <Container />;
};

export default Header;
