import { NewClusterConfig } from '../../types/provision';

export const mockClusterConfig: NewClusterConfig = {
  clusterName: 'kubefirst-worker-1',
  environment: 'preprod',
  cloudRegion: 'LON1',
  instanceSize: '8 CPU Cores / 64 GB RAM / 120 GB NvME storage / 8 TB Data Transfer',
  nodeCount: 3,
};
