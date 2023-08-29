import { Edge } from 'reactflow';

import { ManagementCluster, ClusterType, ClusterStatus } from '../../types/provision';
import { CustomGraphNode, GraphNodeInfo } from '../../components/graphNode';

const WORKLOAD_CLUSTER_Y_SPACE = 60;
const WORKLOAD_CLUSTER_X_SPACE = 140;
const NODE_HEIGHT = 90;
const NODE_WIDTH = 360;

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

export function generateNodesConfig(cluster: ManagementCluster): [CustomGraphNode[], Edge[]] {
  const { workloadClusters, ...managementClusterInfo } = cluster;
  const { id: managementClusterId } = managementClusterInfo;

  const workloadClusterLength = workloadClusters.length;
  const spacesBetweenClusterNodes = workloadClusterLength - 1;

  // get total height of all nodes and space inbetween
  const totalHeight =
    workloadClusterLength * NODE_HEIGHT + spacesBetweenClusterNodes * WORKLOAD_CLUSTER_Y_SPACE;

  // place the middle of the node at the top of the column
  const initialClusterYPosition = -(totalHeight / 2) + NODE_HEIGHT / 2;

  const nodes: CustomGraphNode[] = [
    generateNode(
      managementClusterId,
      {
        x: 0,
        y: 0,
      },
      managementClusterInfo,
    ),
  ];

  const edges: Edge[] = [];

  for (let i = 0; i < workloadClusterLength; i += 1) {
    const workloadCluster = workloadClusters[i];
    const { id: workloadClusterId } = workloadCluster;

    // if first node place - at initial position
    // otherwise add node height and space multiplied by index
    const nodeYPosition = !i
      ? initialClusterYPosition
      : initialClusterYPosition + (WORKLOAD_CLUSTER_Y_SPACE + NODE_HEIGHT) * i;

    const animatedEdge =
      workloadCluster.type === ClusterType.DRAFT ||
      workloadCluster.status === ClusterStatus.PROVISIONING;

    nodes.push(
      generateNode(
        workloadClusterId,
        { x: WORKLOAD_CLUSTER_X_SPACE + NODE_WIDTH, y: nodeYPosition },
        workloadCluster,
      ),
    );

    edges.push(
      generateEdge(
        `edge-${workloadClusterId}`,
        managementClusterId,
        workloadClusterId,
        animatedEdge,
      ),
    );
  }

  return [nodes, edges];
}
