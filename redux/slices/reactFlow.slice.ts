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

import { CustomGraphNode, GraphNodeInfo } from '../../components/graphNode';
import { Cluster, ClusterType } from '../../types/provision';
import { generateEdge, generateNode } from '../../utils/reactFlow';
import { InstallationType } from '../../types/redux';

import { createDraftCluster, removeDraftCluster } from './api.slice';

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
    setDraftNodeActive: (state) => {
      state.nodes = state.nodes.map((node) =>
        node.id === 'draft' ? { ...node, selected: true } : node,
      );
    },
    updateDraftNode: (state, { payload }: PayloadAction<Partial<Cluster>>) => {
      if (payload.id) {
        state.nodes = state.nodes.map((node) => {
          if (node.id === 'draft' && payload.id) {
            node.id = payload.id;
            node.data = payload;
          }
          return node;
        });

        state.edges = state.edges.map((edge) => {
          if (edge.id.includes('draft') && payload.id) {
            edge.id = `edge-${payload.id}`;
            edge.target = payload.id;
          }
          return edge;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createDraftCluster,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          cloudProvider: InstallationType;
          managementNodeId: string;
        }>,
      ) => {
        const { position } = state.nodes[state.nodes.length - 1];

        const { managementNodeId, ...clusterInfo } = payload;

        const draftNode = generateNode(
          'draft',
          { ...position, y: position.y + 200 },
          clusterInfo,
          true,
        );

        const draftEdge = generateEdge('edge-draft', managementNodeId, draftNode.id, true);

        state.nodes = [...state.nodes, draftNode];
        state.edges = addEdge(draftEdge, state.edges);
      },
    );
    builder.addCase(removeDraftCluster, (state) => {
      state.edges = state.edges.filter((edge) => !edge.id.includes('draft'));
      state.nodes = state.nodes.filter((node) => node.id !== 'draft');
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
  setDraftNodeActive,
  updateDraftNode,
} = reactFlowSlice.actions;

export const reactFlowReducer = reactFlowSlice.reducer;
