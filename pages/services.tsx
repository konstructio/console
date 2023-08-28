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

  const { selectedCluster, clusters } = useAppSelector(({ cluster, api }) => ({
    selectedCluster: cluster.selectedCluster,
    clusters: api.managementCluster
      ? [api.managementCluster, ...api.managementCluster.workloadClusters]
      : [],
  }));

  const hasExistingCluster = useMemo(
    () => !isClusterZero || (selectedCluster?.clusterName && clusters.length),
    [clusters.length, isClusterZero, selectedCluster?.clusterName],
  );

  if (!hasExistingCluster) {
    push('/');
  }

  return hasExistingCluster ? <Services /> : null;
};
export default withConfig(ServicesPage);
