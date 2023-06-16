import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getClusterServices,
  getGitOpsCatalogApps,
  installGitOpsApp,
} from '../../redux/thunks/api.thunk';
import { Cluster, ClusterServices } from '../../types/provision';
import { GitOpsCatalogApp } from '../../types/gitOpsCatalog';

export interface ConfigState {
  selectedCluster?: Cluster;
  clusterServices: Array<ClusterServices>;
  gitOpsCatalogApps: Array<GitOpsCatalogApp>;
  isGitOpsCatalogNotificationOpen: boolean;
}

export const initialState: ConfigState = {
  selectedCluster: undefined,
  clusterServices: [],
  gitOpsCatalogApps: [],
  isGitOpsCatalogNotificationOpen: true,
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    setSelectedCluster: (state, { payload: cluster }: PayloadAction<Cluster>) => {
      state.selectedCluster = cluster;
    },
    setIsGitOpsCatalogNotificationOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isGitOpsCatalogNotificationOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterServices.fulfilled, (state, { payload }) => {
        state.clusterServices = payload;
      })
      .addCase(getClusterServices.rejected, (state) => {
        state.clusterServices = [];
      })
      .addCase(installGitOpsApp.fulfilled, (state, { payload }) => {
        const { name, description, image_url } = payload;
        state.clusterServices.push({
          default: false,
          description: description as string,
          name,
          image: image_url,
          links: [],
        });
        state.isGitOpsCatalogNotificationOpen = true;
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

export const { setSelectedCluster, setIsGitOpsCatalogNotificationOpen } = clusterSlice.actions;

export const clusterReducer = clusterSlice.reducer;
