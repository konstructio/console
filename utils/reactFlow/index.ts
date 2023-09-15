import { Edge } from 'reactflow';

import { ManagementCluster, ClusterStatus, Cluster, WorkloadCluster } from '../../types/provision';
import { CustomGraphNode } from '../../components/graphNode';

const WORKLOAD_CLUSTER_Y_SPACE = 60;
const WORKLOAD_CLUSTER_X_SPACE = 250;
const WORKLOAD_NODE_HEIGHT = 126;
const MANAGEMENT_NODE_HEIGHT = 90;
const NODE_WIDTH = 360;

export function generateNode(
  id: string,
  position: { x: number; y: number },
  info: Cluster,
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

export function generateNodesConfig(
  cluster: ManagementCluster,
  draftCluster?: WorkloadCluster,
): [CustomGraphNode[], Edge[]] {
  const { workloadClusters, ...managementClusterInfo } = cluster;
  const { id: managementClusterId } = managementClusterInfo;
  const filteredWorkloadClusters = workloadClusters.filter(
    (cluster) => cluster.status !== ClusterStatus.DELETED,
  );

  if (draftCluster) {
    filteredWorkloadClusters.push(draftCluster);
  }

  const workloadClusterLength = filteredWorkloadClusters.length;
  const spacesBetweenClusterNodes = workloadClusterLength - 1;

  // get total height of all nodes and space inbetween
  const totalHeight =
    workloadClusterLength * WORKLOAD_NODE_HEIGHT +
    spacesBetweenClusterNodes * WORKLOAD_CLUSTER_Y_SPACE;

  // place the middle of the node at the top of the column
  const initialClusterYPosition = -(totalHeight / 2) + MANAGEMENT_NODE_HEIGHT / 2;

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
    const workloadCluster = filteredWorkloadClusters[i];
    const { id: workloadClusterId } = workloadCluster;

    // if first node place at initial position
    // otherwise add workload node height and space multiplied by index
    const nodeYPosition = !i
      ? initialClusterYPosition
      : initialClusterYPosition + (WORKLOAD_CLUSTER_Y_SPACE + WORKLOAD_NODE_HEIGHT) * i;

    const animatedEdge =
      workloadCluster.id === 'draft' || workloadCluster.status === ClusterStatus.PROVISIONING;

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
