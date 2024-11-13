import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import {
  createCluster,
  getCloudDomains,
  getCloudRegions,
  getClusters,
  getInstanceSizes,
  getRegionZones,
} from '../thunks/api.thunk';
import {
  ManagementCluster,
  ClusterCreationStep,
  ClusterStatus,
  Cluster,
} from '../../types/provision';

export interface ApiState {
  loading: boolean;
  status?: ClusterStatus;
  isProvisioned: boolean;
  isError: boolean;
  responseError?: string;
  lastErrorCondition?: string;
  managementCluster?: ManagementCluster;
  presentedClusterName?: Cluster['clusterName'];
  completedSteps: Array<{ label: string; order: number }>;
  cloudDomains: Array<string>;
  cloudRegions: Array<string>;
  cloudZones: string[];
  instanceSizes: string[];
  isAuthenticationValid?: boolean;
  clusterCreationStep: ClusterCreationStep;
}

export const initialState: ApiState = {
  isProvisioned: false,
  isError: false,
  lastErrorCondition: undefined,
  status: undefined,
  loading: false,
  presentedClusterName: undefined,
  completedSteps: [],
  cloudDomains: [],
  cloudRegions: [],
  cloudZones: [],
  instanceSizes: [],
  isAuthenticationValid: undefined,
  clusterCreationStep: ClusterCreationStep.CONFIG,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setPresentedClusterName: (
      state,
      { payload }: PayloadAction<ApiState['presentedClusterName']>,
    ) => {
      state.presentedClusterName = payload;
    },
    setManagementCluster: (state, { payload }: PayloadAction<ApiState['managementCluster']>) => {
      state.managementCluster = payload;
      state.lastErrorCondition = payload?.lastErrorCondition;
      state.isError = payload?.status === ClusterStatus.ERROR;
      state.isProvisioned = payload?.status === ClusterStatus.PROVISIONED;
    },
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },
    clearClusterState: (state) => {
      state.isError = false;
      state.lastErrorCondition = undefined;
      state.status = undefined;
      state.loading = false;
      state.completedSteps = [];
      state.cloudDomains = [];
      state.cloudRegions = [];
      state.isAuthenticationValid = undefined;
    },
    clearValidation: (state) => {
      state.isAuthenticationValid = undefined;
    },
    clearDomains: (state) => {
      state.cloudDomains = [];
    },
    setClusterCreationStep: (state, { payload }: PayloadAction<ClusterCreationStep>) => {
      state.clusterCreationStep = payload;
    },
    clearResponseError: (state) => {
      state.responseError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCluster.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCluster.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.responseError = action.error.message;
      })
      .addCase(getClusters.fulfilled, (state, { payload: managementCluster }) => {
        state.loading = false;
        state.managementCluster = managementCluster;

        state.lastErrorCondition = managementCluster.lastErrorCondition;
        state.isError = managementCluster.status === ClusterStatus.ERROR;
        state.isProvisioned = managementCluster.status === ClusterStatus.PROVISIONED;
      })
      .addCase(getClusters.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.responseError = action.error.message;
        state.managementCluster = undefined;
      })
      .addCase(getCloudDomains.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCloudDomains.rejected, (state, action) => {
        state.loading = false;
        state.responseError = action.error.message;
      })
      .addCase(getCloudDomains.fulfilled, (state, { payload }: PayloadAction<Array<string>>) => {
        state.loading = false;
        state.cloudDomains = sortBy(payload);
      })
      .addCase(getCloudRegions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCloudRegions.fulfilled, (state, { payload }: PayloadAction<Array<string>>) => {
        state.cloudRegions = sortBy(payload);
        state.isAuthenticationValid = true;
        state.loading = false;
      })
      .addCase(getCloudRegions.rejected, (state) => {
        state.isAuthenticationValid = false;
        state.loading = false;
      })
      .addCase(getInstanceSizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstanceSizes.fulfilled, (state, { payload }) => {
        state.instanceSizes = payload;
        state.loading = false;
      })
      .addCase(getInstanceSizes.rejected, (state, action) => {
        state.loading = false;
        state.instanceSizes = [];
        state.responseError = action.error.message;
      })
      .addCase(getRegionZones.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegionZones.fulfilled, (state, { payload }) => {
        state.cloudZones = payload;
        state.loading = false;
      })
      .addCase(getRegionZones.rejected, (state, action) => {
        state.loading = false;
        state.cloudZones = [];
        state.responseError = action.error.message;
      });
  },
});

export const {
  clearValidation,
  setCompletedSteps,
  clearClusterState,
  clearDomains,
  setClusterCreationStep,
  setPresentedClusterName,
  setManagementCluster,
  clearResponseError,
} = apiSlice.actions;

export const apiReducer = apiSlice.reducer;
