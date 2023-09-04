import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { getClusters } from '../redux/thunks/api.thunk';
import withConfig from '../hoc/withConfig';
import { setSelectedCluster } from '../redux/slices/cluster.slice';
export { getServerSideProps } from '../hoc/withConfig';

const MainPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { managementCluster } = useAppSelector(({ api }) => api);

  useEffect(() => {
    dispatch(getClusters())
      .unwrap()
      .then(() => {
        push('/services');
      })
      .catch(() => {
        push('/provision');
      });
  }, [dispatch, push]);

  useEffect(() => {
    if (managementCluster && managementCluster.id) {
      dispatch(setSelectedCluster(managementCluster));
    }
  }, [dispatch, managementCluster]);

  return null;
};

export default withConfig(MainPage);
