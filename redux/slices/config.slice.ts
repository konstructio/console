import { createSlice } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryEnabled: boolean;
  isLocal: boolean;
}

export const initialState: ConfigState = {
  isTelemetryEnabled: false,
  isLocal: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues(state, payload) {
      const { isTelemetryEnabled, isLocal } = payload.payload;
      state.isTelemetryEnabled = isTelemetryEnabled;
      state.isLocal = isLocal;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export default configSlice.reducer;
