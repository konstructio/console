import { FunctionComponent, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/store';
import withConfig from '../hoc/withConfig';
import { setSelectedCluster } from '../redux/slices/cluster.slice';
export { getServerSideProps } from '../hoc/withConfig';

const MainPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { managementCluster } = useAppSelector(({ api }) => api);

  useEffect(() => {
    if (managementCluster && managementCluster.id) {
      dispatch(setSelectedCluster(managementCluster));
    }
  }, [dispatch, managementCluster]);

  return null;
};

export default withConfig(MainPage);
