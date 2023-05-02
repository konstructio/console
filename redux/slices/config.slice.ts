import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  apiUrl?: string;
  isTelemetryEnabled: boolean;
  kubefirstVersion?: string;
  k3dDomain?: string;
}

export const initialState: ConfigState = {
  isTelemetryEnabled: false,
  apiUrl: undefined,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues: (state, action: PayloadAction<ConfigState>) => {
      const { apiUrl, isTelemetryEnabled, kubefirstVersion, k3dDomain } = action.payload;
      state.isTelemetryEnabled = isTelemetryEnabled;
      state.kubefirstVersion = kubefirstVersion;
      state.k3dDomain = k3dDomain;
      state.apiUrl = apiUrl;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export const configReducer = configSlice.reducer;
