import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryDisabled: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
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
      const { isTelemetryDisabled, kubefirstVersion, isClusterZero } = action.payload;
      state.isTelemetryDisabled = isTelemetryDisabled;
      state.kubefirstVersion = kubefirstVersion;
      state.isClusterZero = isClusterZero;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export const configReducer = configSlice.reducer;
