import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createCluster,
  deleteCluster,
  getCluster,
  getClusters,
  getMarketplaceApps,
} from '../thunks/api.thunk';
import { Cluster, ClusterStatus } from '../../types/provision';
import { MarketplaceApp } from '../../types/marketplace';

export interface ApiState {
  loading: boolean;
  isProvisioning: boolean;
  isProvisioned: boolean;
  isDeleted: boolean;
  isDeleting: boolean;
  status?: ClusterStatus;
  isError: boolean;
  lastErrorCondition?: string;
  clusters: Array<Cluster>;
  selectedCluster?: Cluster;
  completedSteps: Array<{ label: string; order: number }>;
  marketplaceApps: Array<MarketplaceApp>;
}

export const initialState: ApiState = {
  isProvisioning: true,
  isProvisioned: false,
  isError: false,
  lastErrorCondition: undefined,
  isDeleting: false,
  isDeleted: false,
  status: undefined,
  loading: false,
  clusters: [],
  selectedCluster: undefined,
  completedSteps: [],
  marketplaceApps: [],
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },
    clearClusterState: (state) => {
      state.isProvisioning = true;
      state.isProvisioned = false;
      state.isError = false;
      state.lastErrorCondition = undefined;
      state.isDeleting = false;
      state.isDeleted = false;
      state.status = undefined;
      state.loading = false;
      state.clusters = [];
      state.selectedCluster = undefined;
      state.completedSteps = [];
    },
  },
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
        state.selectedCluster = payload;
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
        } else if (state.status === ClusterStatus.ERROR) {
          state.isError = true;
          state.lastErrorCondition = payload.lastErrorCondition;
        }
      })
      .addCase(getClusters.fulfilled, (state, { payload }: PayloadAction<Array<Cluster>>) => {
        state.loading = false;
        state.isError = false;
        state.clusters = payload;
      })
      .addCase(
        getMarketplaceApps.fulfilled,
        (state, { payload }: PayloadAction<Array<MarketplaceApp>>) => {
          state.marketplaceApps = payload;
        },
      );
  },
});

export const { setCompletedSteps, clearClusterState } = apiSlice.actions;

export const apiReducer = apiSlice.reducer;
