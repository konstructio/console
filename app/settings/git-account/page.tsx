'use client';
import React, { FunctionComponent } from 'react';

import GitAccount from '@/containers/GitAccount/GitAccount';
import { useAppSelector } from '@/redux/store';

const GitAccountPage: FunctionComponent = () => {
  const { managementCluster } = useAppSelector(({ api }) => api);

  return managementCluster ? <GitAccount /> : null;
};

export default GitAccountPage;
