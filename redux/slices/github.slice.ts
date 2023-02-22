/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUser, getGitUserOrganizations } from '../actions/github.action';

export interface GithubState {
  user?: any;
  organizations?: Array<any>;
  isLoading: boolean;
  isTokenValid: boolean;
}

export const initialState: GithubState = {
  user: null,
  organizations: [],
  isLoading: false,
  isTokenValid: false,
};

const github = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isTokenValid = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isTokenValid = false;
    });
    builder.addCase(getGitUserOrganizations.pending, (state) => {
      state.isLoading = true;
      state.isTokenValid = false;
    });
    builder.addCase(getGitUserOrganizations.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getGitUserOrganizations.fulfilled,
      (state, action: PayloadAction<Array<any>>) => {
        state.organizations = action.payload;
        state.isLoading = false;
        state.isTokenValid = true;
      },
    );
  },
});

export default github.reducer;
