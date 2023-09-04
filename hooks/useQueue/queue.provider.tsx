import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import axios from 'axios';
import { Snackbar } from '@mui/material';

import { setClusterQueue } from '../../redux/slices/queue.slice';
import { createQueryString } from '../../utils/url/formatDomain';
import { ClusterQueue, ClusterResponse, ClusterStatus } from '../../types/provision';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import useToggle from '../../hooks/useToggle';

import QueueContext from './queue.context';

const QueueProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [deletedCluster, setDeletedCluster] = useState<string>('');
  const { isOpen, open, close } = useToggle();
  const dispatch = useAppDispatch();
  const { clusterQueue } = useAppSelector(({ queue }) => queue);

  const queue: { [key: string]: NodeJS.Timer } = useMemo(() => ({}), []);

  const handleCloseNotification = () => {
    setDeletedCluster('');
    close();
  };

  const getClusterInterval = useCallback(
    (incomingClusterQueue: ClusterQueue) => {
      return setInterval(async () => {
        const { clusterName, id } = incomingClusterQueue;
        const res = await axios.get<ClusterResponse>(
          `/api/proxy?${createQueryString('url', `/cluster/${clusterName || 'kubefirst'}`)}`,
        );

        const workloadCluster = res.data.workload_clusters?.find(
          ({ cluster_id }) => cluster_id === id,
        );
        const { status } = workloadCluster ?? {};

        dispatch(
          setClusterQueue({
            ...clusterQueue,
            [id]: { ...incomingClusterQueue, status: status as ClusterStatus },
          }),
        );

        if (
          ![ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status as ClusterStatus)
        ) {
          incomingClusterQueue.callback && incomingClusterQueue.callback();
          clearInterval(queue[id]);
        }

        if (status === ClusterStatus.DELETED) {
          setDeletedCluster(workloadCluster?.cluster_name as string);
          open();
        }
      }, 10000);
    },
    [clusterQueue, dispatch, open, queue],
  );

  const addClusterToQueue = (incomingClusterQueue: ClusterQueue) => {
    dispatch(setClusterQueue({ ...clusterQueue, [incomingClusterQueue.id]: incomingClusterQueue }));
  };

  useEffect(() => {
    if (clusterQueue) {
      Object.keys(clusterQueue).map((clusterId) => {
        const { status } = clusterQueue[clusterId];
        if (
          !queue[clusterId] &&
          [ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status)
        ) {
          queue[clusterId] = getClusterInterval(clusterQueue[clusterId]);
        }
      });
    }
  }, [clusterQueue, getClusterInterval, queue]);

  return (
    <QueueContext.Provider
      value={{
        addClusterToQueue,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isOpen}
        autoHideDuration={3000}
        message={`Cluster ${deletedCluster} has been deleted`}
        onClose={handleCloseNotification}
      />
    </QueueContext.Provider>
  );
};
export default QueueProvider;
