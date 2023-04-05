import { createSlice } from '@reduxjs/toolkit';

import { GithubUser, GithubUserOrganization } from '../../types/github/index';
import { getUser, getUserOrganizations } from '../thunks/github.thunk';

export interface GithubUserState {
  user: GithubUser | null;
  organizations: GithubUserOrganization[];
  isLoading: boolean;
  isTokenValid: boolean;
  error: string | null;
}

export const initialState: GithubUserState = {
  user: null,
  organizations: [],
  isLoading: false,
  isTokenValid: false,
  error: null,
};

const githubUserSlice = createSlice({
  name: 'github-user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isTokenValid = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to get user';
      })
      .addCase(getUserOrganizations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to get users organizations';
      })
      .addCase(getUserOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.isLoading = false;
        state.isTokenValid = true;
      });
  },
});

export const { clearUserError } = githubUserSlice.actions;

export const githubUserReducer = githubUserSlice.reducer;
