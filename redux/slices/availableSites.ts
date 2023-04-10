import { createSlice } from '@reduxjs/toolkit';

import { checkReadiness } from '../thunks/readiness.thunk';

export interface AvailableSitesState {
  sites: Array<string>;
  error: string | null;
  loading: boolean;
}

export const initialState: AvailableSitesState = {
  sites: [],
  error: null,
  loading: false,
};

const availableSitesSlice = createSlice({
  name: 'available-sites',
  initialState,
  reducers: {
    clearAvailableSitesError: (state) => {
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
        state.sites.push(action.payload.url);
      })
      .addCase(checkReadiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'failed to check readiness';
      });
  },
});

export const { clearAvailableSitesError } = availableSitesSlice.actions;

export const availableSitesReducer = availableSitesSlice.reducer;
