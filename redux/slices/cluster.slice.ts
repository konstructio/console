import { createSlice } from '@reduxjs/toolkit';

import { createCluster } from '../thunks/cluster';

export interface apiState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const initialState: apiState = {
  isSuccess: false,
  isError: false,
  loading: false,
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCluster.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(createCluster.rejected, (state) => {
        state.loading = false;
        state.isSuccess = false;
      });
  },
});

export const clusterReducer = clusterSlice.reducer;
