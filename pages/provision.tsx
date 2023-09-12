import React, { FunctionComponent, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../redux/store';
import useFeatureFlag from '../hooks/useFeatureFlag';
import Provision from '../containers/provision';
import withConfig from '../hoc/withConfig';
export { getServerSideProps } from '../hoc/withConfig';

const ProvisionPage: FunctionComponent = () => {
  const { push } = useRouter();
  const { managementCluster } = useAppSelector(({ api }) => api);

  const { isEnabled: isMultiClusterEnabled } = useFeatureFlag('multicluster-management');

  const isEnabled = useMemo(
    () => isMultiClusterEnabled || !managementCluster,
    [isMultiClusterEnabled, managementCluster],
  );

  if (process.env.NODE_ENV !== 'development' || !isEnabled) {
    push('/services');
  }

  return isEnabled ? <Provision /> : null;
};

export default withConfig(ProvisionPage);
