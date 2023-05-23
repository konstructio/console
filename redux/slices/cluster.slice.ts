import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getClusterServices,
  getMarketplaceApps,
  installMarketplaceApp,
} from '../../redux/thunks/api.thunk';
import { Cluster, ClusterServices } from '../../types/provision';
import { MarketplaceApp } from '../../types/marketplace';

export interface ConfigState {
  selectedCluster?: Cluster;
  clusterServices: Array<ClusterServices>;
  marketplaceApps: Array<MarketplaceApp>;
  isMarketplaceNotificationOpen: boolean;
}

export const initialState: ConfigState = {
  selectedCluster: undefined,
  clusterServices: [],
  marketplaceApps: [],
  isMarketplaceNotificationOpen: false,
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    setSelectedCluster: (state, { payload: cluster }: PayloadAction<Cluster>) => {
      state.selectedCluster = cluster;
    },
    setIsMarketplaceNotificationOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMarketplaceNotificationOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterServices.fulfilled, (state, { payload }) => {
        state.clusterServices = payload;
      })
      .addCase(installMarketplaceApp.fulfilled, (state, { payload }) => {
        const { name, description, image_url } = payload;
        state.clusterServices.push({
          default: false,
          description: description as string,
          name,
          image: image_url,
          links: [],
        });
      })
      .addCase(
        getMarketplaceApps.fulfilled,
        (state, { payload }: PayloadAction<Array<MarketplaceApp>>) => {
          state.marketplaceApps = payload;
        },
      );
  },
});

export const { setSelectedCluster, setIsMarketplaceNotificationOpen } = clusterSlice.actions;

export const clusterReducer = clusterSlice.reducer;
