import { createSlice } from '@reduxjs/toolkit';

import { checkSiteReadiness } from '../thunks/readiness.thunk';

export interface ReadinessState {
  availableSites: Array<string>;
  error: string | null;
  loading: boolean;
}

export const initialState: ReadinessState = {
  availableSites: [],
  error: null,
  loading: false,
};

const readinessSlice = createSlice({
  name: 'readiness',
  initialState,
  reducers: {
    clearReadinessError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSiteReadiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSiteReadiness.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSites.push(action.payload.url);
      })
      .addCase(checkSiteReadiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'failed to check readiness';
      });
  },
});

export const { clearReadinessError } = readinessSlice.actions;

export const readinessReducer = readinessSlice.reducer;
