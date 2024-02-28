'use client';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';

// import GitAccount from '@/containers/GitAccount/GitAccount';
// import { useAppSelector } from '@/redux/store';
import { Route } from '@/constants';

const GitAccountPage: FunctionComponent = () => {
  // const { managementCluster } = useAppSelector(({ api }) => api);
  const { push } = useRouter();

  push(Route.HOME);

  return null;

  // return managementCluster ? <GitAccount /> : null;
};

export default GitAccountPage;
