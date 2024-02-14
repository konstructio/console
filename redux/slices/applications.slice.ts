import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getClusterApplications,
  getGitOpsCatalogApps,
  installGitOpsApp,
} from '@/redux/thunks/applications.thunk';
import { ManagementCluster, WorkloadCluster } from '@/types/provision';
import { GitOpsCatalogApp, ClusterApplication, Target } from '@/types/applications';

export interface ApplicationsState {
  target: Target;
  selectedCluster?: ManagementCluster | WorkloadCluster;
  selectedApplication?: string;
  clusterApplications: Array<ClusterApplication>;
  gitOpsCatalogApps: Array<GitOpsCatalogApp>;
  appsQueue: Array<string>;
}

export const initialState: ApplicationsState = {
  target: Target.CLUSTER,
  selectedCluster: undefined,
  clusterApplications: [],
  gitOpsCatalogApps: [],
  appsQueue: [],
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setTarget: (state, { payload }: PayloadAction<Target>) => {
      state.target = payload;
      state.selectedCluster = undefined;
    },
    setSelectedCluster: (
      state,
      { payload }: PayloadAction<ApplicationsState['selectedCluster']>,
    ) => {
      state.selectedCluster = payload;
    },
    setSelectedApplication: (
      state,
      { payload }: PayloadAction<ApplicationsState['selectedApplication']>,
    ) => {
      state.selectedApplication = payload;
    },
    addAppToQueue: (state, { payload }: PayloadAction<GitOpsCatalogApp>) => {
      state.appsQueue.push(payload.name);
    },
    removeAppFromQueue: (state, { payload }: PayloadAction<GitOpsCatalogApp>) => {
      state.appsQueue = state.appsQueue.filter((name) => name !== payload.name);
    },
    resetClusterApplications: (state) => {
      state.clusterApplications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterApplications.fulfilled, (state, { payload }) => {
        state.clusterApplications = payload;
      })
      .addCase(getClusterApplications.rejected, (state) => {
        state.clusterApplications = [];
      })
      .addCase(installGitOpsApp.fulfilled, (state, { payload }) => {
        state.appsQueue = state.appsQueue.filter((name) => name !== payload.name);

        const { name, description, image_url } = payload;
        state.clusterApplications.push({
          default: false,
          description: description as string,
          name,
          image: image_url,
          links: [],
        });
      })
      .addCase(installGitOpsApp.rejected, (state) => {
        const queue = Object.assign(state.appsQueue, []);
        queue.pop();
        state.appsQueue = queue;
      })
      .addCase(
        getGitOpsCatalogApps.fulfilled,
        (state, { payload }: PayloadAction<Array<GitOpsCatalogApp>>) => {
          state.gitOpsCatalogApps = payload;
        },
      )
      .addCase(getGitOpsCatalogApps.rejected, (state) => {
        state.gitOpsCatalogApps = [];
      });
  },
});

export const {
  addAppToQueue,
  removeAppFromQueue,
  resetClusterApplications,
  setSelectedApplication,
  setSelectedCluster,
  setTarget,
} = applicationsSlice.actions;

export const applicationsReducer = applicationsSlice.reducer;
