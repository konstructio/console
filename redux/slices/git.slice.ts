import { createSlice } from '@reduxjs/toolkit';

import { GithubUser, GithubUserOrganization } from '../../types/github/index';
import { getGithubUser, getGithubUserOrganizations } from '../thunks/git.thunk';

export interface GitState {
  githubUser: GithubUser | null;
  githubUserOrganizations: GithubUserOrganization[];
  isLoading: boolean;
  isTokenValid: boolean;
  error: string | null;
}

export const initialState: GitState = {
  githubUser: null,
  githubUserOrganizations: [],
  isLoading: false,
  isTokenValid: false,
  error: null,
};

const gitSlice = createSlice({
  name: 'git',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGithubUser.fulfilled, (state, action) => {
        state.githubUser = action.payload;
        state.isTokenValid = true;
      })
      .addCase(getGithubUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to get user';
      })
      .addCase(getGithubUserOrganizations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGithubUserOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to get users organizations';
      })
      .addCase(getGithubUserOrganizations.fulfilled, (state, action) => {
        state.githubUserOrganizations = action.payload.sort((a, b) =>
          a.login.localeCompare(b.login),
        );
        state.isLoading = false;
        state.isTokenValid = true;
      });
  },
});

export const { clearUserError } = gitSlice.actions;

export const gitReducer = gitSlice.reducer;
