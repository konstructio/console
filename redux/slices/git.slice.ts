import { createSlice } from '@reduxjs/toolkit';
import { GitLabGroup, GitLabUser } from 'types/gitlab';

import { GithubUser, GithubUserOrganization } from '../../types/github/index';
import {
  getGithubUser,
  getGithubUserOrganizations,
  getGitlabGroups,
  getGitlabUser,
} from '../thunks/git.thunk';

export interface GitState {
  githubUser: GithubUser | null;
  githubUserOrganizations: Array<GithubUserOrganization>;
  gitlabUser: GitLabUser | null;
  gitlabGroups: Array<GitLabGroup>;
  isLoading: boolean;
  isTokenValid: boolean;
  error: string | null;
}

export const initialState: GitState = {
  githubUser: null,
  githubUserOrganizations: [],
  gitlabUser: null,
  gitlabGroups: [],
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
    clearGitState: (state) => {
      state.githubUser = null;
      state.githubUserOrganizations = [];
      state.gitlabUser = null;
      state.gitlabGroups = [];
      state.isLoading = false;
      state.isTokenValid = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* GitHub */
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
      })
      /* GitLab */
      .addCase(getGitlabUser.fulfilled, (state, action) => {
        state.gitlabUser = action.payload;
        state.isTokenValid = true;
      })
      .addCase(getGitlabUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to get user';
      })
      .addCase(getGitlabGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitlabGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to get user groups';
      })
      .addCase(getGitlabGroups.fulfilled, (state, action) => {
        state.gitlabGroups = action.payload.sort((a, b) => a.name.localeCompare(b.name));
        state.isLoading = false;
        state.isTokenValid = true;
      });
  },
});

export const { clearGitState, clearUserError } = gitSlice.actions;

export const gitReducer = gitSlice.reducer;
