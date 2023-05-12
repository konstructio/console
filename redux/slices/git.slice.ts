import { createSlice } from '@reduxjs/toolkit';

import { GithubUser, GithubUserOrganization } from '../../types/github/index';
import {
  getGithubUser,
  getGithubUserOrganizations,
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitlabGroups,
  getGitlabUser,
  getGitLabProjects,
} from '../thunks/git.thunk';
import { GitLabGroup, GitLabUser } from '../../types/gitlab';
import { KUBEFIRST_REPOSITORIES, KUBEFIRST_TEAMS } from '../../constants';

export interface GitState {
  githubUser: GithubUser | null;
  githubUserOrganizations: Array<GithubUserOrganization>;
  gitlabUser: GitLabUser | null;
  gitlabGroups: Array<GitLabGroup>;
  isLoading: boolean;
  isTokenValid: boolean;
  error: string | null;
  loadedRepositories?: boolean;
  loadedTeams?: boolean;
  hasExistingTeams?: boolean;
  hasExistingRepos?: boolean;
  token?: string;
  gitOwner?: string;
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
    setToken: (state, action) => {
      state.token = action.payload;
      state.loadedRepositories = false;
      state.loadedTeams = false;
      state.hasExistingTeams = false;
      state.hasExistingRepos = false;
    },
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
      state.token = undefined;
      state.loadedRepositories = undefined;
      state.loadedTeams = undefined;
      state.hasExistingTeams = undefined;
      state.hasExistingRepos = undefined;
    },
    clearGitValidationState: (state) => {
      state.loadedRepositories = undefined;
      state.loadedTeams = undefined;
      state.hasExistingTeams = undefined;
      state.hasExistingRepos = undefined;
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
      .addCase(getGitHubOrgRepositories.fulfilled, (state, { payload: organizationRepos }) => {
        const kubefirstRepos = organizationRepos.filter(({ name }) =>
          KUBEFIRST_REPOSITORIES.includes(name),
        );
        state.loadedRepositories = true;
        state.hasExistingRepos = kubefirstRepos.length > 0;
      })
      .addCase(getGitHubOrgTeams.fulfilled, (state, { payload: organizationTeams }) => {
        const kubefirstTeams = organizationTeams.filter(({ name }) =>
          KUBEFIRST_TEAMS.includes(name),
        );
        state.loadedTeams = true;
        state.hasExistingTeams = kubefirstTeams.length > 0;
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
      })
      .addCase(getGitLabProjects.fulfilled, (state, { payload: groupProjects }) => {
        const kubefirstRepos = groupProjects.filter(({ name }) =>
          KUBEFIRST_REPOSITORIES.includes(name),
        );

        const kubefirstTeams = state.gitlabGroups.filter(({ name }) =>
          KUBEFIRST_TEAMS.includes(name),
        );

        state.loadedRepositories = true;
        state.loadedTeams = true;
        state.hasExistingRepos = kubefirstRepos.length > 0;
        state.hasExistingTeams = kubefirstTeams.length > 0;
      });
  },
});

export const { clearGitValidationState, clearGitState, clearUserError, setToken } =
  gitSlice.actions;

export const gitReducer = gitSlice.reducer;
