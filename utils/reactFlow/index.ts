import { Edge } from 'reactflow';

import { Cluster } from '../../types/provision';
import { CustomGraphNode } from '../../components/graphNode';

export function generateNode(
  id: string,
  position: { x: number; y: number },
  cluster: Partial<Cluster>,
  selected = false,
): CustomGraphNode {
  return {
    id,
    type: 'custom',
    data: cluster,
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

export function generateNodesConfig(
  managementCluster: Cluster,
  workloadClusters: Cluster[],
): [CustomGraphNode[], Edge[]] {
  const managementNodeId = '1';
  const nodes: CustomGraphNode[] = [
    generateNode(
      managementNodeId,
      {
        x: 0,
        y: (workloadClusters.length * 200) / 2,
      },
      managementCluster,
    ),
  ];

  const edges: Edge[] = [];

  for (let i = 0; i < workloadClusters.length; i += 1) {
    const generatedId = `${i + 2}`;

    nodes.push(generateNode(generatedId, { x: 600, y: i * 200 }, workloadClusters[i]));
    edges.push(generateEdge(`edge-${i + 1}`, managementNodeId, generatedId));
  }

  return [nodes, edges];
}
