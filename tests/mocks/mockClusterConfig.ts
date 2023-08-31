import { ClusterType, NewWorkloadClusterConfig } from '../../types/provision';

export const mockClusterConfig: NewWorkloadClusterConfig = {
  clusterName: 'kubefirst-worker-1',
  environment: 'preprod',
  cloudRegion: 'LON1',
  instanceSize: '8 CPU Cores / 64 GB RAM / 120 GB NvME storage / 8 TB Data Transfer',
  nodeCount: 3,
  type: ClusterType.WORKLOAD,
};
