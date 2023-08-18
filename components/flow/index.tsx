import React, { useCallback, type FunctionComponent, MouseEvent } from 'react';
import ReactFlow, { NodeTypes, Node, ReactFlowProvider, useReactFlow } from 'reactflow';

import { GraphNode } from '../graphNode';
import { ClusterInfo } from '../../components/clusterTable/clusterTable';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { onConnect, onEdgesChange, onNodesChange } from '../../redux/slices/reactFlow.slice';

import 'reactflow/dist/style.css';

const nodeTypes: NodeTypes = {
  custom: GraphNode,
};

interface GraphViewProps {
  onNodeClick: (clusterInfo: ClusterInfo) => void;
}

const GraphView: FunctionComponent<GraphViewProps> = ({ onNodeClick }) => {
  const { nodes, edges } = useAppSelector(({ reactFlow }) => reactFlow);

  const dispatch = useAppDispatch();

  const { setCenter } = useReactFlow();

  const handleNodeClick = useCallback(
    (e: MouseEvent, node: Node) => {
      const { data, position, width, height } = node;
      // Focus in viewport on selected node
      setCenter(position.x + (width ?? 400), position.y + (height ?? 0), {
        zoom: 1.2,
        duration: 500,
      });
      onNodeClick(data);
    },
    [onNodeClick, setCenter],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes) => dispatch(onNodesChange(changes))}
      onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
      onConnect={(connection) => dispatch(onConnect(connection))}
      onNodeClick={handleNodeClick}
      nodeTypes={nodeTypes}
      fitView
    />
  );
};

export const Flow: FunctionComponent<GraphViewProps> = (props) => (
  <ReactFlowProvider>
    <GraphView {...props} />
  </ReactFlowProvider>
);
