'use client';
import { createContext } from 'react';

import { ClusterQueue } from '@/types/provision';

export interface QueueContenxtProps {
  addClusterToQueue: (clusterQueue: ClusterQueue) => void;
  deleteFromClusterToQueue: (clusterId: string) => void;
}

const QueueContext = createContext<QueueContenxtProps>({} as QueueContenxtProps);
export default QueueContext;
