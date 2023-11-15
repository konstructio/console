'use client';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import axios from 'axios';

import { removeClusterFromQueue, setClusterQueue } from '../../redux/slices/queue.slice';
import { createQueryString } from '../../utils/url/formatDomain';
import { ClusterQueue, ClusterResponse, ClusterStatus, ClusterType } from '../../types/provision';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  setClusterMap,
  setClusterNameCache,
  setManagementCluster,
} from '../../redux/slices/api.slice';
import { setError } from '../../redux/slices/installation.slice';
import { mapClusterFromRaw } from '../../utils/mapClustersFromRaw';
import { setBoundEnvironments } from '../../redux/slices/environments.slice';
import { createNotification } from '../../redux/slices/notifications.slice';

import QueueContext from './queue.context';

const QueueProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { clusterQueue } = useAppSelector(({ queue }) => queue);
  const dispatch = useAppDispatch();

  const queue: { [key: string]: NodeJS.Timer } = useMemo(() => ({}), []);

  const getClusterInterval = useCallback(
    (incomingClusterQueue: ClusterQueue) => {
      return setInterval(async () => {
        const { clusterName, clusterType, id } = incomingClusterQueue;
        const res = await axios.get<ClusterResponse>(
          `/api/proxy?${createQueryString('url', `/cluster/${clusterName || 'kubefirst'}`)}`,
        );

        const { managementCluster, clusterCache, clusterNameCache, envCache } = mapClusterFromRaw(
          res.data,
        );

        dispatch(setManagementCluster(managementCluster));
        dispatch(setClusterMap(clusterCache));
        dispatch(setClusterNameCache(clusterNameCache));
        dispatch(setBoundEnvironments(envCache));

        if (clusterType === ClusterType.MANAGEMENT) {
          const { status } = res.data || {};

          dispatch(
            setClusterQueue({
              ...clusterQueue,
              [id]: { ...incomingClusterQueue, status: status as ClusterStatus },
            }),
          );

          if (![ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status)) {
            incomingClusterQueue.callback && incomingClusterQueue.callback();
            clearInterval(queue[id]);
          }

          if (status === ClusterStatus.ERROR) {
            dispatch(setError({ error: res.data.last_condition }));
          }

          return;
        }

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

        if (status === ClusterStatus.PROVISIONED) {
          dispatch(removeClusterFromQueue(id));
        }

        if (status === ClusterStatus.DELETED) {
          dispatch(
            createNotification({
              message: `Cluster ${workloadCluster?.cluster_name} has been deleted`,
              type: 'success',
              snackBarOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            }),
          );
          dispatch(removeClusterFromQueue(id));
        }
      }, 10000);
    },
    [clusterQueue, dispatch, queue],
  );

  const addClusterToQueue = (incomingClusterQueue: ClusterQueue) => {
    dispatch(setClusterQueue({ ...clusterQueue, [incomingClusterQueue.id]: incomingClusterQueue }));
  };

  const deleteFromClusterToQueue = (clusterId: string) => {
    const { [clusterId.toString()]: clusterToDelete, ...rest } = clusterQueue;

    delete queue[clusterToDelete.id];
    dispatch(setClusterQueue(rest));
  };

  useEffect(() => {
    clusterQueue &&
      Object.keys(clusterQueue).map((clusterId) => {
        const { status } = clusterQueue[clusterId];
        if (
          !queue[clusterId] &&
          [ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status)
        ) {
          queue[clusterId] = getClusterInterval(clusterQueue[clusterId]);
        }
      });
  }, [clusterQueue, getClusterInterval, queue, dispatch]);

  return (
    <QueueContext.Provider
      value={{
        addClusterToQueue,
        deleteFromClusterToQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
export default QueueProvider;
