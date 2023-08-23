import React, { type FunctionComponent, useEffect } from 'react';
import ReactFlow, { NodeTypes, ReactFlowProvider, useReactFlow } from 'reactflow';

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

  const { setCenter, fitView } = useReactFlow();

  useEffect(() => {
    const selectedNode = nodes.find((node) => node.selected);
    if (selectedNode) {
      const { position, width, height } = selectedNode;

      setCenter(position.x + (width ?? 400), position.y + (height ?? 0), {
        zoom: 1.2,
        duration: 500,
      });
    } else {
      fitView({ duration: 500, padding: 0.2 });
    }
  }, [nodes, setCenter, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes) => dispatch(onNodesChange(changes))}
      onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
      onConnect={(connection) => dispatch(onConnect(connection))}
      onNodeClick={(_, node) => onNodeClick(node.data)}
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
