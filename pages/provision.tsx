import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../redux/store';
import Provision from '../containers/provision';
import withConfig from '../hoc/withConfig';
export { getServerSideProps } from '../hoc/withConfig';

const ProvisionPage: FunctionComponent = () => {
  const { push } = useRouter();
  const { isClusterZero } = useAppSelector(({ config }) => config);

  if (!isClusterZero) {
    push('/services');
  }

  return isClusterZero ? <Provision /> : null;
};

export default withConfig(ProvisionPage);
