import { createSlice } from '@reduxjs/toolkit';

export interface ConfigState {
  isTelemetryEnabled: boolean;
}

export const initialState: ConfigState = {
  isTelemetryEnabled: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigValues(state, payload) {
      const { isTelemetryEnabled } = payload.payload;
      state.isTelemetryEnabled = isTelemetryEnabled;
    },
  },
});

export const { setConfigValues } = configSlice.actions;

export default configSlice.reducer;
