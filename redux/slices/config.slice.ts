import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getEnvVariables } from '../thunks/config.thunk';

import { ClusterManagementTab, EnvironmentVariables } from '@/types/config';

export interface ConfigState {
  isAuthDisabled: boolean;
  isTelemetryDisabled: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
  isLoading: boolean;
  clusterManagementTab: ClusterManagementTab;
  saasURL?: string;
}

export const initialState: ConfigState = {
  isAuthDisabled: false,
  isTelemetryDisabled: false,
  isClusterZero: false,
  isLoading: false,
  saasURL: '',
  clusterManagementTab: ClusterManagementTab.GRAPH_VIEW,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues: (state, action: PayloadAction<EnvironmentVariables>) => {
      const {
        isClusterZero,
        installMethod,
        disableTelemetry,
        kubefirstVersion,
        disableAuth,
        saasURL,
      } = action.payload;

      state.isTelemetryDisabled = !!disableTelemetry;
      state.kubefirstVersion = kubefirstVersion;
      state.isClusterZero = isClusterZero;
      state.installMethod = installMethod;
      state.isAuthDisabled = !!disableAuth;
      state.saasURL = saasURL;
    },
    setClusterManagamentTab: (state, { payload }: PayloadAction<ClusterManagementTab>) => {
      state.clusterManagementTab = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnvVariables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getEnvVariables.fulfilled,
        (state, { payload }: PayloadAction<EnvironmentVariables>) => {
          state.isLoading = false;
          state.isClusterZero = payload.isClusterZero;
          state.installMethod = payload.installMethod;
          state.isTelemetryDisabled = !!payload.disableTelemetry;
          state.kubefirstVersion = payload.kubefirstVersion;
          state.isAuthDisabled = !!payload.disableAuth;
        },
      )
      .addCase(getEnvVariables.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setConfigValues, setClusterManagamentTab } = configSlice.actions;

export const configReducer = configSlice.reducer;
