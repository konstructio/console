import React, { FunctionComponent, useMemo } from 'react';
import { useRouter } from 'next/router';

import withConfig from '../hoc/withConfig';
import Services from '../containers/services';
import { useAppSelector } from '../redux/store';
export { getServerSideProps } from '../hoc/withConfig';

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
export default withConfig(ServicesPage);
