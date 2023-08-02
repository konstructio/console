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

const initialNodes: CustomGraphNode[] = [
  {
    id: '1',
    type: 'management',
    data: {
      label: 'kubefirst-mgmt',
      cloud: 'AWS',
      region: 'ap-southeast-1',
      status: 'available',
      nodeCount: 2,
    },
    position: { x: 5, y: 0 },
    draggable: false,
  },
  {
    id: '2',
    type: 'worker',
    data: {
      label: 'kubefirst-worker-one',
      cloud: 'AWS',
      region: 'ap-southeast-1',
      status: 'unavailable',
      nodeCount: 2,
    },
    position: { x: 500, y: -100 },
    draggable: false,
  },
  {
    id: '3',
    type: 'worker',
    data: {
      label: 'kubefirst-worker-one',
      cloud: 'AWS',
      region: 'ap-southeast-1',
      status: 'available',
      nodeCount: 2,
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
  management: GraphNode,
  workload: GraphNode,
  draft: GraphNode,
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
