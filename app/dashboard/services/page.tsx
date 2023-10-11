'use client';
import React, { FunctionComponent, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Services from '../../../containers/services';
import { useAppSelector } from '../../../redux/store';

export interface ServicesPageProps {
  isClusterZero: boolean;
}

const ServicesPage: FunctionComponent<ServicesPageProps> = ({ isClusterZero }) => {
  const { push } = useRouter();

  const { managementCluster } = useAppSelector(({ api }) => api);

  const hasExistingCluster = useMemo(
    () => !isClusterZero || managementCluster,
    [isClusterZero, managementCluster],
  );

  if (!hasExistingCluster) {
    push('/');
  }

  return hasExistingCluster ? <Services /> : null;
};
export default ServicesPage;
