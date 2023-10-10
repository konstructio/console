import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getFlags } from '@/redux/thunks/config.thunk';
import { Flags } from '@/types/config';

export interface FeatureFlagsState {
  flags?: Record<string, string | boolean>;
  isLoading: boolean;
}

export const initialState: FeatureFlagsState = {
  flags: {},
  isLoading: false,
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlags.fulfilled, (state, { payload }: PayloadAction<Flags>) => {
        state.isLoading = false;
        state.flags = payload.flags;
      })
      .addCase(getFlags.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const featureFlagsReducer = featureFlagsSlice.reducer;
