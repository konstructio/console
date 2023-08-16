import { Cluster, ClusterType } from '../types/provision';

export function sortClustersByType(clusters: Cluster[]) {
  let managementCluster: Cluster | undefined;
  const workloadClusters: Cluster[] = [];

  for (const cluster of clusters) {
    if (cluster.type === ClusterType.MANAGEMENT) {
      managementCluster = cluster;
    } else {
      workloadClusters.push(cluster);
    }
  }

  return {
    managementCluster,
    workloadClusters,
  };
}
