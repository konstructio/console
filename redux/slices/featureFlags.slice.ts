import { createSlice } from '@reduxjs/toolkit';

export interface FeatureFlagsState {
  flags: { [key: string]: boolean };
  loaded: boolean;
}

export const initialState: FeatureFlagsState = {
  flags: {},
  loaded: false,
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    setFeatureFlags(state, { payload }) {
      state.flags = payload;
      state.loaded = true;
    },
  },
});

export const { setFeatureFlags } = featureFlagsSlice.actions;

export default featureFlagsSlice.reducer;
