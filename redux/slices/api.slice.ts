import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import {
  createCluster,
  createWorkloadCluster,
  deleteCluster,
  getCloudDomains,
  getCloudRegions,
  getCluster,
  getClusters,
  getInstanceSizes,
  getRegionZones,
} from '../thunks/api.thunk';
import {
  ManagementCluster,
  ClusterCreationStep,
  ClusterStatus,
  NewWorkloadClusterConfig,
  WorkloadCluster,
  Cluster,
  DraftCluster,
  ClusterEnvironment,
} from '../../types/provision';
import { ClusterCache, ClusterNameCache } from '../../types/redux';

export interface ApiState {
  loading: boolean;
  status?: ClusterStatus;
  isProvisioned: boolean;
  isError: boolean;
  responseError?: string;
  lastErrorCondition?: string;
  managementCluster?: ManagementCluster;
  presentedClusterId?: Cluster['clusterId'];
  completedSteps: Array<{ label: string; order: number }>;
  cloudDomains: Array<string>;
  cloudRegions: Array<string>;
  cloudZones: string[];
  instanceSizes: string[];
  isAuthenticationValid?: boolean;
  clusterCreationStep: ClusterCreationStep;
  clusterConfig?: NewWorkloadClusterConfig;
  clusterMap: ClusterCache;
  clusterNameCache: ClusterNameCache;
}

export const initialState: ApiState = {
  isProvisioned: false,
  isError: false,
  lastErrorCondition: undefined,
  status: undefined,
  loading: false,
  presentedClusterId: undefined,
  completedSteps: [],
  cloudDomains: [],
  cloudRegions: [],
  cloudZones: [],
  instanceSizes: [],
  isAuthenticationValid: undefined,
  clusterCreationStep: ClusterCreationStep.CONFIG,
  clusterMap: {},
  clusterNameCache: {},
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setPresentedClusterId: (state, { payload }: PayloadAction<ApiState['presentedClusterId']>) => {
      state.presentedClusterId = payload;
    },
    setManagementCluster: (state, { payload }: PayloadAction<ApiState['managementCluster']>) => {
      state.managementCluster = payload;
      state.lastErrorCondition = payload?.lastErrorCondition;
      state.isError = payload?.status === ClusterStatus.ERROR;
      state.isProvisioned = payload?.status === ClusterStatus.PROVISIONED;
    },
    setClusterMap: (state, { payload }: PayloadAction<ClusterCache>) => {
      state.clusterMap = payload;
    },
    setClusterNameCache: (state, { payload }: PayloadAction<ClusterNameCache>) => {
      state.clusterNameCache = payload;
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
    setClusterConfig: (state, { payload }: PayloadAction<NewWorkloadClusterConfig>) => {
      state.clusterConfig = payload;
    },
    createDraftCluster: (state, { payload }: PayloadAction<WorkloadCluster>) => {
      state.clusterMap[payload.clusterId] = payload;
      state.presentedClusterId = payload.clusterId;
    },
    removeDraftCluster: (state) => {
      delete state.clusterMap['draft'];
    },
    updateDraftCluster: (state, { payload }: PayloadAction<DraftCluster>) => {
      const currentDraftCluster = state.clusterMap['draft'];
      if (currentDraftCluster) {
        state.clusterMap['draft'] = {
          ...currentDraftCluster,
          ...payload,
        };
      }
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
      .addCase(createWorkloadCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkloadCluster.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.responseError = action.error.message;
      })
      .addCase(createWorkloadCluster.fulfilled, (state, { payload: clusterId }) => {
        state.loading = false;

        const draftCluster = state.clusterMap['draft'];

        const provisioningWorkloadCluster: WorkloadCluster = {
          ...draftCluster,
          clusterId,
          status: ClusterStatus.PROVISIONING,
          environment: draftCluster.environment as ClusterEnvironment,
        };

        state.clusterMap[clusterId] = provisioningWorkloadCluster;
        delete state.clusterMap['draft'];

        state.presentedClusterId = clusterId;
      })
      .addCase(deleteCluster.pending, (state) => {
        if (state.presentedClusterId) {
          state.clusterMap[state.presentedClusterId].status = ClusterStatus.DELETING;
        }
      })
      .addCase(deleteCluster.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCluster.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.responseError = action.error.message;
      })
      .addCase(
        getCluster.fulfilled,
        (state, { payload: { managementCluster, clusterCache, clusterNameCache } }) => {
          state.loading = false;
          state.status = managementCluster.status;
          state.managementCluster = managementCluster;
          state.clusterMap = clusterCache;
          state.clusterNameCache = clusterNameCache;

          state.lastErrorCondition = managementCluster.lastErrorCondition;
          state.isError = managementCluster.status === ClusterStatus.ERROR;
          state.isProvisioned = managementCluster.status === ClusterStatus.PROVISIONED;
        },
      )
      .addCase(getCluster.rejected, (state, action) => {
        state.loading = false;
        state.responseError = action.error.message;
      })
      .addCase(
        getClusters.fulfilled,
        (state, { payload: { managementCluster, clusterCache, clusterNameCache } }) => {
          state.loading = false;
          state.isError = false;
          state.managementCluster = managementCluster;
          state.clusterMap = clusterCache;
          state.clusterNameCache = clusterNameCache;
        },
      )
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
  setClusterConfig,
  createDraftCluster,
  removeDraftCluster,
  updateDraftCluster,
  setPresentedClusterId,
  setManagementCluster,
  setClusterMap,
  setClusterNameCache,
  clearResponseError,
} = apiSlice.actions;

export const apiReducer = apiSlice.reducer;
