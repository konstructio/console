import { createSlice } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryEnabled: boolean;
  kubefirstVersion: string;
  k3dDomain: string;
}

export const initialState: ConfigState = {
  isTelemetryEnabled: false,
  kubefirstVersion: '',
  k3dDomain: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues(state, payload) {
      const { isTelemetryEnabled, k3dDomain, kubefirstVersion } = payload.payload;
      state.isTelemetryEnabled = isTelemetryEnabled;
      state.kubefirstVersion = kubefirstVersion;
      state.k3dDomain = k3dDomain;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export default configSlice.reducer;
