import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getClusterApplications,
  getGitOpsCatalogApps,
  installGitOpsApp,
  uninstallGitOpsApp,
  validateGitOpsApplication,
} from '@/redux/thunks/applications.thunk';
import { GitOpsCatalogApp, ClusterApplication, Target, AppCategory } from '@/types/applications';
import { ManagementCluster, WorkloadCluster } from '@/types/provision';

export interface ApplicationsState {
  selectedCluster?: ManagementCluster | WorkloadCluster;
  selectedCategories: AppCategory[];
  selectedApplicationName?: string;
  selectedCatalogApp?: GitOpsCatalogApp;
  canDeleteSelectedApp: boolean;
  clusterApplications: Array<ClusterApplication>;
  installedClusterAppNames: ClusterApplication['name'][];
  selectedClusterApplication?: ClusterApplication;
  isLoading: boolean;
  isValidating: boolean;
  gitOpsCatalogApps: Array<GitOpsCatalogApp>;
  appsQueue: Array<string>;
  filter: { target?: Target; cluster?: string };
}

export const initialState: ApplicationsState = {
  selectedCluster: undefined,
  selectedClusterApplication: undefined,
  selectedCategories: [],
  clusterApplications: [],
  installedClusterAppNames: [],
  isLoading: false,
  isValidating: false,
  gitOpsCatalogApps: [],
  canDeleteSelectedApp: true,
  appsQueue: [],
  filter: {
    target: Target.CLUSTER,
    cluster: '',
  },
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setSelectedCluster: (
      state,
      { payload }: PayloadAction<ApplicationsState['selectedCluster']>,
    ) => {
      state.selectedCluster = payload;
    },
    setFilterState: (state, { payload }: PayloadAction<ApplicationsState['filter']>) => {
      const targetChanged = payload.target !== state.filter.target;
      if (targetChanged) {
        state.clusterApplications = [];
      }
      state.filter = {
        ...payload,
        cluster: targetChanged ? undefined : payload.cluster,
      };
    },
    addAppToQueue: (state, { payload }: PayloadAction<string>) => {
      state.appsQueue.push(payload);
    },
    removeAppFromQueue: (state, { payload }: PayloadAction<string>) => {
      state.appsQueue = state.appsQueue.filter((name) => name !== payload);
    },
    resetClusterApplications: (state) => {
      state.clusterApplications = [];
    },
    addCategory: (state, { payload }: PayloadAction<AppCategory>) => {
      state.selectedCategories = [...state.selectedCategories, payload];
    },
    removeCategory: (state, { payload }: PayloadAction<AppCategory>) => {
      state.selectedCategories = state.selectedCategories.filter(
        (selectedCategory) => selectedCategory !== payload,
      );
    },
    setSelectedCatalogApp: (
      state,
      { payload }: PayloadAction<ApplicationsState['selectedCatalogApp']>,
    ) => {
      state.selectedCatalogApp = payload;
    },
    setSelectedClusterApplication: (
      state,
      { payload }: PayloadAction<ApplicationsState['selectedClusterApplication']>,
    ) => {
      state.selectedClusterApplication = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterApplications.pending, (state) => {
        state.clusterApplications = [];
        state.installedClusterAppNames = [];
      })
      .addCase(getClusterApplications.fulfilled, (state, { payload }) => {
        if (payload) {
          state.clusterApplications = payload;

          state.installedClusterAppNames = payload.map((app) => app.name);
        } else {
          state.installedClusterAppNames = [];
          state.clusterApplications = [];
        }
      })
      .addCase(getClusterApplications.rejected, (state) => {
        state.clusterApplications = [];
        state.installedClusterAppNames = [];
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
        state.installedClusterAppNames.push(name);
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
      })
      .addCase(uninstallGitOpsApp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uninstallGitOpsApp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(uninstallGitOpsApp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(validateGitOpsApplication.pending, (state) => {
        state.isValidating = true;
      })
      .addCase(validateGitOpsApplication.fulfilled, (state, { payload }) => {
        state.canDeleteSelectedApp = !!payload.can_delete_service;
        state.isValidating = false;
      })
      .addCase(validateGitOpsApplication.rejected, (state) => {
        state.canDeleteSelectedApp = true;
        state.isValidating = false;
      });
  },
});

export const {
  addAppToQueue,
  removeAppFromQueue,
  resetClusterApplications,
  setFilterState,
  addCategory,
  removeCategory,
  setSelectedCatalogApp,
  setSelectedCluster,
  setSelectedClusterApplication,
} = applicationsSlice.actions;

export const applicationsReducer = applicationsSlice.reducer;
