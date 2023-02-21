import { createSlice } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryEnabled: boolean;
  kubefirstVersion: string;
}

export const initialState: ConfigState = {
  isTelemetryEnabled: false,
  kubefirstVersion: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues(state, payload) {
      const { isTelemetryEnabled, kubefirstVersion } = payload.payload;
      state.isTelemetryEnabled = isTelemetryEnabled;
      state.kubefirstVersion = kubefirstVersion;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export default configSlice.reducer;
