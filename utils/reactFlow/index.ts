import { Edge } from 'reactflow';

import { Cluster } from '../../types/provision';
import { CustomGraphNode } from '../../components/graphNode';

export function generateNode(
  cluster: Cluster,
  id: string,
  position: { x: number; y: number },
): CustomGraphNode {
  return {
    id,
    type: 'custom',
    data: cluster,
    position,
    draggable: false,
  };
}

export function generateEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    animated: false,
    type: 'straight',
    style: { strokeWidth: 2, stroke: '#CBD5E1' },
  };
}

export function generateNodesConfig(
  managementCluster: Cluster,
  workloadClusters: Cluster[],
): [CustomGraphNode[], Edge[]] {
  const managementNodeId = '1';
  const nodes: CustomGraphNode[] = [
    generateNode(managementCluster, managementNodeId, {
      x: 0,
      y: (workloadClusters.length * 200) / 2,
    }),
  ];

  const edges: Edge[] = [];

  for (let i = 0; i < workloadClusters.length; i += 1) {
    const generatedId = `${i + 2}`;

    nodes.push(generateNode(workloadClusters[i], generatedId, { x: 600, y: i * 200 }));
    edges.push(generateEdge(`edge-${i + 1}`, managementNodeId, generatedId));
  }

  return [nodes, edges];
}
