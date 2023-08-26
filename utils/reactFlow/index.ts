import { Edge } from 'reactflow';

import { Cluster, ClusterType } from '../../types/provision';
import { CustomGraphNode, GraphNodeInfo } from '../../components/graphNode';

export function generateNode(
  id: string,
  position: { x: number; y: number },
  info: Partial<GraphNodeInfo>,
  selected = false,
): CustomGraphNode {
  return {
    id,
    type: 'custom',
    data: info,
    position,
    draggable: false,
    selected,
  };
}

export function generateEdge(id: string, source: string, target: string, animated = false): Edge {
  return {
    id,
    source,
    target,
    animated,
    type: 'straight',
    style: { strokeWidth: 2, stroke: '#CBD5E1' },
  };
}

export function generateNodesConfig(cluster: Cluster): [CustomGraphNode[], Edge[]] {
  const { id: managementClusterId, workloadClusters, ...managementClusterInfo } = cluster;

  const nodes: CustomGraphNode[] = [
    generateNode(
      managementClusterId,
      {
        x: 0,
        y: (workloadClusters.length * 200) / 2,
      },
      managementClusterInfo,
    ),
  ];

  const edges: Edge[] = [];

  for (let i = 0; i < workloadClusters.length; i += 1) {
    const workloadCluster = workloadClusters[i];
    const { id: workloadClusterId } = workloadCluster;

    nodes.push(
      generateNode(
        workloadClusterId,
        { x: 600, y: i * 200 },
        {
          ...workloadCluster,
          cloudProvider: managementClusterInfo.cloudProvider,
          type: ClusterType.WORKLOAD,
        },
      ),
    );
    edges.push(generateEdge(`edge-${workloadClusterId}`, managementClusterId, workloadClusterId));
  }

  return [nodes, edges];
}
