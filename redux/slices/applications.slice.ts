import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getClusterApplications,
  getGitOpsCatalogApps,
  installGitOpsApp,
} from '@/redux/thunks/applications.thunk';
import { GitOpsCatalogApp, ClusterApplication, Target, AppCategory } from '@/types/applications';
import { ManagementCluster, WorkloadCluster } from '@/types/provision';

export interface ApplicationsState {
  selectedCluster?: ManagementCluster | WorkloadCluster;
  selectedCategories: AppCategory[];
  selectedApplicationName?: string;
  selectedCatalogApp?: GitOpsCatalogApp;
  clusterApplications: Array<ClusterApplication>;
  installedClusterAppNames: ClusterApplication['name'][];
  gitOpsCatalogApps: Array<GitOpsCatalogApp>;
  appsQueue: Array<string>;
  filter: { target?: Target; cluster?: string; searchTerm?: string };
}

export const initialState: ApplicationsState = {
  selectedCluster: undefined,
  selectedCategories: [],
  clusterApplications: [],
  installedClusterAppNames: [],
  gitOpsCatalogApps: [],
  appsQueue: [],
  filter: {
    target: undefined,
    cluster: '',
    searchTerm: '',
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
    addAppToQueue: (state, { payload }: PayloadAction<GitOpsCatalogApp>) => {
      state.appsQueue.push(payload.name);
    },
    removeAppFromQueue: (state, { payload }: PayloadAction<GitOpsCatalogApp>) => {
      state.appsQueue = state.appsQueue.filter((name) => name !== payload.name);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterApplications.fulfilled, (state, { payload }) => {
        state.clusterApplications = payload;
        state.installedClusterAppNames = payload.map((app) => app.name);
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
} = applicationsSlice.actions;

export const applicationsReducer = applicationsSlice.reducer;
