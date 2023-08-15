import { ClusterInfo } from '../components/clusterTable/clusterTable';
import { ClusterType } from '../types/provision';

export function sortClustersByType(clusters: ClusterInfo[]) {
  let managementCluster: ClusterInfo | undefined;
  const workloadClusters: ClusterInfo[] = [];

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
