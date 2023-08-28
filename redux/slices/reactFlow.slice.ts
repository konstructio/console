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

import { createDraftCluster, setSelectedCluster } from './api.slice';

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
    unSelectNodes: (state) => {
      state.nodes = state.nodes.map((node) => ({ ...node, selected: false }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedCluster, (state, { payload }) => {
        if (!payload) {
          state.nodes = state.nodes.map((node) => ({ ...node, selected: false }));
        }
      })
      .addCase(createDraftCluster, (state) => {
        const draftNode = state.nodes.find((node) => node.id === 'draft');
        if (draftNode) {
          draftNode.selected = true;
        }
      });
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
  unSelectNodes,
} = reactFlowSlice.actions;

export const reactFlowReducer = reactFlowSlice.reducer;
