import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createCluster,
  createWorkloadCluster,
  deleteCluster,
  getCloudDomains,
  getCloudRegions,
  getCluster,
  getClusters,
} from '../thunks/api.thunk';
import {
  Cluster,
  ClusterCreationStep,
  ClusterStatus,
  NewClusterConfig,
} from '../../types/provision';
import { GraphNodeInfo } from '../../components/graphNode';
import { InstallationType } from 'types/redux';

export interface ApiState {
  loading: boolean;
  isProvisioning: boolean;
  isProvisioned: boolean;
  isDeleted: boolean;
  isDeleting: boolean;
  status?: ClusterStatus;
  isError: boolean;
  lastErrorCondition?: string;
  managementCluster?: Cluster;
  draftCluster?: Partial<GraphNodeInfo>;
  selectedCluster?: Cluster;
  completedSteps: Array<{ label: string; order: number }>;
  cloudDomains: Array<string>;
  cloudRegions: Array<string>;
  isAuthenticationValid?: boolean;
  clusterCreationStep: ClusterCreationStep;
  clusterConfig?: NewClusterConfig;
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
  selectedCluster: undefined,
  completedSteps: [],
  cloudDomains: [],
  cloudRegions: [],
  isAuthenticationValid: undefined,
  clusterCreationStep: ClusterCreationStep.CONFIG,
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
      state.managementCluster = undefined;
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
    setClusterConfig: (state, { payload }: PayloadAction<NewClusterConfig>) => {
      state.clusterConfig = payload;
    },
    createDraftCluster: {
      prepare: ({
        cloudProvider,
        managementNodeId,
      }: {
        cloudProvider: InstallationType;
        managementNodeId: string;
      }) => {
        return {
          payload: {
            id: 'draft',
            managementNodeId,
            cloudProvider,
          },
        };
      },
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          cloudProvider: InstallationType;
          managementNodeId: string;
        }>,
      ) => {
        state.draftCluster = payload;
      },
    },
    removeDraftCluster: (state) => {
      state.draftCluster = undefined;
    },
    addWorkloadCluster: (state) => {
      // if(state.managementCluster){
      //   state.managementCluster.push()
      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCluster.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.status = payload.status;
        state.isProvisioning = true;
      })
      .addCase(createCluster.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.isProvisioning = false;
      })
      .addCase(createWorkloadCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkloadCluster.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      })
      .addCase(createWorkloadCluster.fulfilled, (state) => {
        state.loading = false;
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
        state.status = payload.status;

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
      .addCase(getClusters.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.managementCluster = payload;
      })
      .addCase(getClusters.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.managementCluster = undefined;
      })
      .addCase(getCloudDomains.fulfilled, (state, { payload }: PayloadAction<Array<string>>) => {
        state.cloudDomains = payload;
      })
      .addCase(getCloudRegions.fulfilled, (state, { payload }: PayloadAction<Array<string>>) => {
        state.cloudRegions = payload;
        state.isAuthenticationValid = true;
      })
      .addCase(getCloudRegions.rejected, (state) => {
        state.isAuthenticationValid = false;
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
} = apiSlice.actions;

export const apiReducer = apiSlice.reducer;
