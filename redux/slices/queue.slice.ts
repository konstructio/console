import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClusterQueue } from '../../types/provision';

export type Queue = {
  [key: string]: ClusterQueue;
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
});

export const { setClusterQueue, removeClusterFromQueue } = queueSlice.actions;

export const queueReducer = queueSlice.reducer;
