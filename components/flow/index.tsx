import React, { useCallback, type FunctionComponent, MouseEvent } from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Connection,
  NodeTypes,
  useNodesState,
  useEdgesState,
  Node,
} from 'reactflow';

import { GraphNode, type CustomGraphNode } from '../graphNode';
import 'reactflow/dist/style.css';
import { ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';
import { ClusterInfo } from '../../components/clusterTable/clusterTable';

const clusters: ClusterInfo[] = [
  {
    clusterName: 'kuberfirst-mgmt',
    type: ClusterType.MANAGEMENT,
    cloudProvider: InstallationType.AWS,
    cloudRegion: 'ap-southeast-1',
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
    nodes: 2,
  },
  {
    clusterName: 'kuberfirst-worker-1',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.CIVO,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.ERROR,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-worker-2',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.DIGITAL_OCEAN,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.DELETING,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-worker-3',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.DIGITAL_OCEAN,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-worker-4',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.VULTR,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-worker-5',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.VULTR,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
];

function generateNode(
  cluster: ClusterInfo,
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

function generateEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    animated: false,
    type: 'straight',
    style: { strokeWidth: 2, stroke: '#CBD5E1' },
  };
}

function generateNodesConfig(
  managementCluster: ClusterInfo,
  workloadClusters: ClusterInfo[],
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

const [managemenCluster, ...workloadClusters] = clusters;

const [initialNodes, initialEdges] = generateNodesConfig(managemenCluster, workloadClusters);

const nodeTypes: NodeTypes = {
  custom: GraphNode,
};

interface FlowProps {
  onNodeClick: (clusterInfo: ClusterInfo) => void;
}

export const Flow: FunctionComponent<FlowProps> = ({ onNodeClick }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleNodeClick = useCallback(
    (e: MouseEvent, node: Node) => {
      onNodeClick(node.data);
    },
    [onNodeClick],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
    />
  );
};
