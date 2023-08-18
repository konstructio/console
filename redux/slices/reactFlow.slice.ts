import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'reactflow';

export interface ReactFlowState {
  nodes: Node[];
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
    setNodes: (state, { payload }: PayloadAction<Node[]>) => {
      state.nodes = payload;
    },
    setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
      state.edges = payload;
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
  },
});

export const { setNodes, setEdges, onNodesChange, onEdgesChange, onConnect } =
  reactFlowSlice.actions;

export const reactFlowReducer = reactFlowSlice.reducer;
