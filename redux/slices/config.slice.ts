import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryDisabled: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
}

export const initialState: ConfigState = {
  isTelemetryDisabled: false,
  isClusterZero: false,
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
});

export const { setConfigValues } = configSlice.actions;

export const configReducer = configSlice.reducer;
