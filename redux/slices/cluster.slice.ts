import router from 'next/router';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createCluster, deleteCluster, getCluster, getClusters } from '../thunks/cluster';
import { ProvisionStatus } from '../../types/provision';

export interface apiState {
  loading: boolean;
  isProvisioning: boolean;
  isProvisioned: boolean;
  isDeleted: boolean;
  isDeleting: boolean;
  status?: ProvisionStatus;
  isError: boolean;
  // ToDo: add cluster type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clusters: Array<any>;
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
      .addCase(createCluster.fulfilled, (state, { payload }: PayloadAction<{ Status: string }>) => {
        state.loading = false;
        state.status = payload.Status as ProvisionStatus;
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
      .addCase(getCluster.fulfilled, (state, { payload }: PayloadAction<{ Status: string }>) => {
        state.loading = false;
        state.status = payload.Status as ProvisionStatus;

        if (state.status === ProvisionStatus.DELETED) {
          state.isDeleted = true;
          state.isDeleting = false;
          state.isError = false;
        } else if (state.status === ProvisionStatus.PROVISIONED) {
          state.isProvisioned = true;
          state.isProvisioning = false;
          state.isError = false;
        }
      })
      .addCase(
        getClusters.fulfilled,
        (state, { payload }: PayloadAction<Array<{ Status: string }>>) => {
          state.loading = false;
          state.isError = false;
          state.clusters = payload;
        },
      );
  },
});

export const clusterReducer = clusterSlice.reducer;
