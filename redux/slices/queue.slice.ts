import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { setClusterQueue } = queueSlice.actions;

export const queueReducer = queueSlice.reducer;
