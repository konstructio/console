import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClusterQueue } from '../../types/provision';
import { createCluster, createWorkloadCluster, deleteCluster } from '../thunks/api.thunk';
import { Cluster } from '../../types/provision';

export type Queue = {
  [x: Cluster['clusterName']]: ClusterQueue;
};

export interface QueueState {
  clusterQueue: Queue;
}

export const initialState: QueueState = {
  clusterQueue: {},
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setClusterQueue: (state, action) => {
      state.clusterQueue = action.payload;
    },
    removeClusterFromQueue: (state, { payload }: PayloadAction<string>) => {
      if (state.clusterQueue[payload]) {
        delete state.clusterQueue[payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCluster.fulfilled, (state, { payload: { clusterName, status } }) => {
        state.clusterQueue[clusterName] = { clusterName, status };
      })
      .addCase(createWorkloadCluster.fulfilled, (state, { payload: { clusterName, status } }) => {
        state.clusterQueue[clusterName] = { clusterName, status };
      })
      .addCase(deleteCluster.fulfilled, (state, { payload: { clusterName, status } }) => {
        state.clusterQueue[clusterName] = { clusterName, status };
      });
  },
});

export const { setClusterQueue, removeClusterFromQueue } = queueSlice.actions;

export const queueReducer = queueSlice.reducer;
