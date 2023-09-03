import { ManagementCluster } from '../types/provision';

export function getPreviouslyUsedClusterNames(cluster: ManagementCluster): string[] {
  const { workloadClusters, ...managementCluster } = cluster;
  return [...workloadClusters, managementCluster].reduce<string[]>((acc, currentCluster) => {
    const { clusterName } = currentCluster;
    if (clusterName && !acc.includes(clusterName)) {
      acc.push(clusterName);
    }
    return acc;
  }, []);
}
