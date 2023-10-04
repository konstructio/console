import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../redux/store';
import Environments from '../containers/environments';
import withConfig from '../hoc/withConfig';
export { getServerSideProps } from '../hoc/withConfig';

const EnvironmentsPage: FunctionComponent = () => {
  const { push } = useRouter();
  const { isClusterZero } = useAppSelector(({ config }) => config);

  if (!isClusterZero) {
    push('/services');
  }

  return isClusterZero ? <Environments /> : null;
};

export default withConfig(EnvironmentsPage);
