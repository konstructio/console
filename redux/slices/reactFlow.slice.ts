import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
} from 'reactflow';

import { CustomGraphNode } from '../../components/graphNode';
import { ClusterType } from '../../types/provision';
import { generateEdge, generateNode } from '../../utils/reactFlow';

export interface ReactFlowState {
  nodes: CustomGraphNode[];
  edges: Edge[];
}

export const initialState: ReactFlowState = {
  nodes: [],
  edges: [],
};

const reactFlowSlice = createSlice({
  name: 'react-flow',
  initialState,
  reducers: {
    setNodes: (state, { payload }: PayloadAction<CustomGraphNode[]>) => {
      state.nodes = payload;
    },
    addNode: (state, { payload }: PayloadAction<CustomGraphNode>) => {
      state.nodes = [...state.nodes, payload];
    },
    setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
      state.edges = payload;
    },
    addNewEdge: (state, { payload }: PayloadAction<Edge>) => {
      state.edges = addEdge(payload, state.edges);
    },
    onNodesChange: (state, { payload }: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(payload, state.nodes);
    },
    onEdgesChange: (state, { payload }: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(payload, state.edges);
    },
    onConnect: (state, { payload }: PayloadAction<Connection>) => {
      state.edges = addEdge(payload, state.edges);
    },
    generateDraftNode: (state) => {
      const managementNode = state.nodes.find((node) => node.data.type === ClusterType.MANAGEMENT);
      // last node position
      const { position } = state.nodes[state.nodes.length - 1];

      if (managementNode) {
        const {
          id,
          data: { cloudProvider },
        } = managementNode;

        const draftNode = generateNode(
          'draft',
          { ...position, y: position.y + 200 },
          { cloudProvider },
          true,
        );

        const draftEdge = generateEdge('edge-draft', id, draftNode.id, true);

        state.nodes = [...state.nodes, draftNode];
        state.edges = addEdge(draftEdge, state.edges);
      }
    },
    removeDraftNode: (state) => {
      state.edges = state.edges.filter((edge) => !edge.id.includes('draft'));
      state.nodes = state.nodes.filter((node) => node.id !== 'draft');
    },
    unSelectNodes: (state) => {
      state.nodes = state.nodes.map((node) => ({ ...node, selected: false }));
    },
    setDraftNodeActive: (state) => {
      state.nodes = state.nodes.map((node) =>
        node.id === 'draft' ? { ...node, selected: true } : node,
      );
    },
  },
});

export const {
  setNodes,
  addNode,
  setEdges,
  addNewEdge,
  onNodesChange,
  onEdgesChange,
  onConnect,
  generateDraftNode,
  removeDraftNode,
  unSelectNodes,
  setDraftNodeActive,
} = reactFlowSlice.actions;

export const reactFlowReducer = reactFlowSlice.reducer;
