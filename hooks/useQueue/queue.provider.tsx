'use client';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { removeClusterFromQueue, setClusterQueue } from '../../redux/slices/queue.slice';
import { ClusterQueue, ClusterStatus } from '../../types/provision';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { createNotification } from '../../redux/slices/notifications.slice';

import QueueContext from './queue.context';

import { getClusters } from '@/redux/thunks/api.thunk';
import { RESERVED_DRAFT_CLUSTER_NAME } from '@/constants';

const QueueProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { clusterQueue } = useAppSelector(({ queue }) => ({ ...queue }));
  const dispatch = useAppDispatch();

  const queue: { [key: string]: NodeJS.Timer } = useMemo(() => ({}), []);

  const getClusterInterval = useCallback(
    ({ clusterName }: ClusterQueue) => {
      return setInterval(async () => {
        const { status } = await dispatch(getClusters()).unwrap();

        dispatch(
          setClusterQueue({
            ...clusterQueue,
            [clusterName]: { clusterName, status },
          }),
        );

        if (![ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status)) {
          clearInterval(queue[clusterName]);
        }

        if (status === ClusterStatus.PROVISIONED) {
          dispatch(removeClusterFromQueue(clusterName));
        }

        if (status === ClusterStatus.DELETED) {
          dispatch(
            createNotification({
              message: `Cluster ${clusterName} has been deleted`,
              type: 'success',
              snackBarOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            }),
          );
          dispatch(removeClusterFromQueue(clusterName));
        }
      }, 10000);
    },
    [clusterQueue, dispatch, queue],
  );

  const addClusterToQueue = (incomingClusterQueue: ClusterQueue) => {
    dispatch(
      setClusterQueue({
        ...clusterQueue,
        [incomingClusterQueue.clusterName]: incomingClusterQueue,
      }),
    );
  };

  const deleteClusterFromQueue = (clusterName: string) => {
    const { [clusterName]: clusterToDelete, ...rest } = clusterQueue;

    if (clusterToDelete) {
      delete queue[clusterToDelete.clusterName];
    }

    dispatch(setClusterQueue(rest));
  };

  useEffect(() => {
    Object.values(clusterQueue).forEach(({ clusterName, status }) => {
      if (
        clusterName !== RESERVED_DRAFT_CLUSTER_NAME &&
        !queue[clusterName] &&
        [ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status)
      ) {
        queue[clusterName] = getClusterInterval({ clusterName, status });
      }
      if (status === ClusterStatus.DELETED) {
        dispatch(removeClusterFromQueue(clusterName));
      }
    });
  }, [clusterQueue, getClusterInterval, queue, dispatch]);

  return (
    <QueueContext.Provider
      value={{
        addClusterToQueue,
        deleteClusterFromQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
export default QueueProvider;
