import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryEnabled: boolean;
  kubefirstVersion?: string;
  k3dDomain?: string;
}

export const initialState: ConfigState = {
  isTelemetryEnabled: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues: (state, action: PayloadAction<Required<ConfigState>>) => {
      const { isTelemetryEnabled, kubefirstVersion, k3dDomain } = action.payload;
      state.isTelemetryEnabled = isTelemetryEnabled;
      state.kubefirstVersion = kubefirstVersion;
      state.k3dDomain = k3dDomain;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export const configReducer = configSlice.reducer;
