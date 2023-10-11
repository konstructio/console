import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getEnvVariables } from '../thunks/config.thunk';

import { EnvironmentVariables } from '@/types/config';

export interface ConfigState {
  isTelemetryDisabled: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
  isLoading: boolean;
}

export const initialState: ConfigState = {
  isTelemetryDisabled: false,
  isClusterZero: false,
  isLoading: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues: (state, action: PayloadAction<ConfigState>) => {
      const { isClusterZero, installMethod, isTelemetryDisabled, kubefirstVersion } =
        action.payload;
      state.isTelemetryDisabled = isTelemetryDisabled;
      state.kubefirstVersion = kubefirstVersion;
      state.isClusterZero = isClusterZero;
      state.installMethod = installMethod;
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
        },
      )
      .addCase(getEnvVariables.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setConfigValues } = configSlice.actions;

export const configReducer = configSlice.reducer;
