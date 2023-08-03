import React, { useCallback, type FunctionComponent } from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Connection,
  NodeTypes,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { GraphNode, type CustomGraphNode } from '../graphNode';
import 'reactflow/dist/style.css';
import { ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';

const initialNodes: CustomGraphNode[] = [
  {
    id: '1',
    type: 'custom',
    data: {
      clusterName: 'kuberfirst-mgmt2',
      type: ClusterType.MANAGEMENT,
      cloudProvider: InstallationType.AWS,
      cloudRegion: 'ap-southeast-1',
      creationDate: '05 Apr 2023, 12:24:56',
      gitUser: 'Eleanor Carroll',
      status: ClusterStatus.PROVISIONED,
      nodes: 2,
    },
    position: { x: 5, y: 0 },
    draggable: false,
  },
  {
    id: '2',
    type: 'custom',
    data: {
      clusterName: 'kuberfirst-worker-1',
      type: ClusterType.WORKLOAD,
      cloudProvider: InstallationType.AWS,
      cloudRegion: 'ap-southeast-1',
      creationDate: '05 Apr 2023, 12:24:56',
      gitUser: 'Eleanor Carroll',
      status: ClusterStatus.ERROR,
      nodes: 2,
    },
    position: { x: 500, y: -100 },
    draggable: false,
  },
  {
    id: '3',
    type: 'custom',
    data: {
      clusterName: 'kuberfirst-worker-2',
      type: ClusterType.WORKLOAD,
      cloudProvider: InstallationType.AWS,
      cloudRegion: 'ap-southeast-1',
      creationDate: '05 Apr 2023, 12:24:56',
      gitUser: 'Eleanor Carroll',
      status: ClusterStatus.PROVISIONED,
      nodes: 2,
    },
    position: { x: 500, y: 100 },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'edge-1',
    source: '1',
    target: '2',
    animated: false,
    type: 'straight',
    style: { strokeWidth: 2, stroke: '#CBD5E1' },
  },
  {
    id: 'edge-2',
    source: '1',
    target: '3',
    animated: false,
    type: 'straight',
    style: { strokeWidth: 2, stroke: '#CBD5E1' },
  },
];

const nodeTypes: NodeTypes = {
  custom: GraphNode,
};

export const Flow: FunctionComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
    />
  );
};
