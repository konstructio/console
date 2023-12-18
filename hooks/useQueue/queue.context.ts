'use client';
import { createContext } from 'react';

import { ClusterQueue } from '@/types/provision';
import { noop } from '@/utils/noop';

export interface QueueContextProps {
  addClusterToQueue: (clusterQueue: ClusterQueue) => void;
  deleteClusterFromQueue: (clusterId: string) => void;
}

const QueueContext = createContext<QueueContextProps>({
  addClusterToQueue: noop,
  deleteClusterFromQueue: noop,
});

export default QueueContext;
