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
  ManagementCluster,
  ClusterCreationStep,
  ClusterStatus,
  ClusterType,
  NewWorkloadClusterConfig,
  WorkloadCluster,
  Cluster,
} from '../../types/provision';
import { getPreviouslyUsedClusterNames } from '../../utils/getPreviouslyUsedClusterNames';

export interface ApiState {
  loading: boolean;
  isProvisioning: boolean;
  isProvisioned: boolean;
  isDeleted: boolean;
  isDeleting: boolean;
  status?: ClusterStatus;
  isError: boolean;
  lastErrorCondition?: string;
  managementCluster?: ManagementCluster;
  presentedCluster?: Cluster;
  completedSteps: Array<{ label: string; order: number }>;
  cloudDomains: Array<string>;
  cloudRegions: Array<string>;
  isAuthenticationValid?: boolean;
  clusterCreationStep: ClusterCreationStep;
  clusterConfig?: NewWorkloadClusterConfig;
  previouslyUsedClusterNames: string[];
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
  presentedCluster: undefined,
  completedSteps: [],
  cloudDomains: [],
  cloudRegions: [],
  isAuthenticationValid: undefined,
  clusterCreationStep: ClusterCreationStep.CONFIG,
  previouslyUsedClusterNames: [],
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setPresentedCluster: (state, { payload }: PayloadAction<ApiState['presentedCluster']>) => {
      state.presentedCluster = payload;
    },
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
    createDraftCluster: (state) => {
      if (state.managementCluster) {
        const { gitProvider, cloudProvider, domainName, adminEmail, gitAuth } =
          state.managementCluster;

        const draftCluster: WorkloadCluster = {
          id: 'draft',
          clusterName: '',
          type: ClusterType.DRAFT,
          cloudProvider,
          gitProvider,
          domainName,
          gitAuth,
          adminEmail,
        };

        state.managementCluster.workloadClusters.push(draftCluster);
        state.presentedCluster = draftCluster;
      }
    },
    removeDraftCluster: (state) => {
      if (state.managementCluster) {
        state.managementCluster.workloadClusters = state.managementCluster.workloadClusters.filter(
          (cluster) => cluster.type !== ClusterType.DRAFT,
        );
      }
    },
    updateDraftCluster: (state, { payload }: PayloadAction<WorkloadCluster>) => {
      if (state.managementCluster) {
        const workloadClusterToUpdate = state.managementCluster.workloadClusters.find(
          (cluster) => cluster.type === ClusterType.DRAFT,
        );

        if (workloadClusterToUpdate) {
          const updatedCluster: WorkloadCluster = {
            ...workloadClusterToUpdate,
            ...payload,
          };
          state.managementCluster.workloadClusters = state.managementCluster.workloadClusters.map(
            (cluster) => {
              if (cluster.type === ClusterType.DRAFT) {
                cluster = updatedCluster;
              }
              return cluster;
            },
          );

          state.presentedCluster = updatedCluster;
        }
      }
    },
    addToPreviouslyUsedClusterNames: (state, { payload }: PayloadAction<string>) => {
      state.previouslyUsedClusterNames.push(payload);
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
        state.managementCluster = payload;
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
        state.isProvisioning = false;
      })
      .addCase(createWorkloadCluster.fulfilled, (state) => {
        state.loading = false;
        state.isProvisioning = true;
        state.isProvisioned = false;
      })
      .addCase(deleteCluster.pending, (state) => {
        state.isDeleting = true;
        state.isDeleted = false;
        if (state.managementCluster && state.presentedCluster) {
          const deletingCluster = state.managementCluster.workloadClusters.find(
            (cluster) => cluster.id === state.presentedCluster?.id,
          );
          if (deletingCluster) {
            deletingCluster.status = ClusterStatus.DELETING;
          }
        }
      })
      .addCase(deleteCluster.fulfilled, (state) => {
        state.isDeleting = true;
        state.isDeleted = false;
      })
      .addCase(deleteCluster.rejected, (state) => {
        state.isDeleting = false;
        state.isError = true;
      })
      .addCase(getCluster.fulfilled, (state, { payload }: PayloadAction<ManagementCluster>) => {
        state.loading = false;
        state.status = payload.status;
        state.managementCluster = payload;

        state.previouslyUsedClusterNames = getPreviouslyUsedClusterNames(payload);

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

        state.previouslyUsedClusterNames = getPreviouslyUsedClusterNames(payload);

        if (state.presentedCluster) {
          const clusterUpdate = payload.workloadClusters.find(
            (cluster) => cluster.id === state.presentedCluster?.id,
          );
          if (clusterUpdate) {
            state.presentedCluster = clusterUpdate;
          }
        }
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
  updateDraftCluster,
  setPresentedCluster,
  addToPreviouslyUsedClusterNames,
} = apiSlice.actions;

export const apiReducer = apiSlice.reducer;
