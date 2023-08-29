import React, { type FunctionComponent, useEffect } from 'react';
import ReactFlow, { Controls, NodeTypes, ReactFlowProvider, useReactFlow } from 'reactflow';

import { GraphNode } from '../graphNode';
import { ClusterInfo } from '../../components/clusterTable/clusterTable';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  onConnect,
  onEdgesChange,
  onNodesChange,
  selectNodeById,
  setEdges,
  setNodes,
} from '../../redux/slices/reactFlow.slice';
import 'reactflow/dist/style.css';
import { generateNodesConfig } from '../../utils/reactFlow';

const nodeTypes: NodeTypes = {
  custom: GraphNode,
};

interface GraphViewProps {
  onNodeClick: (clusterInfo: ClusterInfo) => void;
}

const GraphView: FunctionComponent<GraphViewProps> = ({ onNodeClick }) => {
  const { nodes, edges } = useAppSelector(({ reactFlow }) => reactFlow);
  const { managementCluster, selectedCluster } = useAppSelector(({ api }) => api);

  const dispatch = useAppDispatch();

  const { setCenter, fitView } = useReactFlow();

  useEffect(() => {
    if (selectedCluster) {
      const selectedNode = nodes.find((node) => node.id === selectedCluster.id);
      if (selectedNode) {
        const { position, width, height, id } = selectedNode;

        dispatch(selectNodeById(id));

        setCenter(position.x + (width ?? 400), position.y + (height ?? 0), {
          zoom: 1.2,
          duration: 500,
        });
      }
    } else {
      fitView({ duration: 500, padding: 0.2 });
    }
  }, [selectedCluster, nodes, setCenter, fitView, dispatch]);

  useEffect(() => {
    if (managementCluster) {
      const [nodes, edges] = generateNodesConfig(managementCluster);
      dispatch(setNodes(nodes));
      dispatch(setEdges(edges));
    }
  }, [managementCluster, dispatch]);

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
    <Controls />
  </ReactFlowProvider>
);
