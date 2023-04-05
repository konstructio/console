import { createSlice } from '@reduxjs/toolkit';

import { checkReadiness } from '../thunks/readiness.thunk';

export interface ValidMetaphorSitesState {
  sites: Array<string>;
  error: string | null;
  loading: boolean;
}

export const initialState: ValidMetaphorSitesState = {
  sites: [],
  error: null,
  loading: false,
};

const validMetaphorSitesSlice = createSlice({
  name: 'valid-metaphor-sites',
  initialState,
  reducers: {
    clearValidMethaphorSitesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkReadiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkReadiness.fulfilled, (state, action) => {
        state.loading = false;
        state.sites.push(action.payload);
      })
      .addCase(checkReadiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'failed to check readiness';
      });
  },
});

export const { clearValidMethaphorSitesError } = validMetaphorSitesSlice.actions;

export const validMetaphorSitesReducer = validMetaphorSitesSlice.reducer;
