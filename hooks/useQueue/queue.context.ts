'use client';
import { createContext } from 'react';

import { ClusterQueue } from '@/types/provision';

export interface QueueContextProps {
  addClusterToQueue: (clusterQueue: ClusterQueue) => void;
  deleteClusterFromQueue: (clusterId: string) => void;
}

const QueueContext = createContext<QueueContextProps>({} as QueueContextProps);
export default QueueContext;
