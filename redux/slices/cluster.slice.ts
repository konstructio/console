import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createCluster, deleteCluster, getCluster, getClusters } from '../thunks/cluster';
import { Cluster, ClusterStatus } from '../../types/provision';

export interface apiState {
  loading: boolean;
  isProvisioning: boolean;
  isProvisioned: boolean;
  isDeleted: boolean;
  isDeleting: boolean;
  status?: ClusterStatus;
  isError: boolean;
  clusters: Array<Cluster>;
}

export const initialState: apiState = {
  isProvisioning: false,
  isProvisioned: false,
  isError: false,
  isDeleting: false,
  isDeleted: false,
  status: undefined,
  loading: false,
  clusters: [],
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
      .addCase(createCluster.fulfilled, (state, { payload }: PayloadAction<Cluster>) => {
        state.loading = false;
        state.status = payload.status as ClusterStatus;
        state.isProvisioning = true;
      })
      .addCase(createCluster.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.isProvisioning = false;
      })
      .addCase(deleteCluster.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteCluster.rejected, (state) => {
        state.isDeleting = false;
        state.isError = true;
      })
      .addCase(getCluster.fulfilled, (state, { payload }: PayloadAction<Cluster>) => {
        state.loading = false;
        state.status = payload.status as ClusterStatus;

        if (state.status === ClusterStatus.DELETED) {
          state.isDeleted = true;
          state.isDeleting = false;
          state.isError = false;
        } else if (state.status === ClusterStatus.PROVISIONED) {
          state.isProvisioned = true;
          state.isProvisioning = false;
          state.isError = false;
        }
      })
      .addCase(getClusters.fulfilled, (state, { payload }: PayloadAction<Array<Cluster>>) => {
        state.loading = false;
        state.isError = false;
        state.clusters = payload;
      });
  },
});

export const clusterReducer = clusterSlice.reducer;
