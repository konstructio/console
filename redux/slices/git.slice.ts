import { createSlice } from '@reduxjs/toolkit';

import { GithubUser, GithubUserOrganization } from '../../types/github/index';
import {
  getGithubUser,
  getGithubUserOrganizations,
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitlabGroups,
  getGitlabUser,
  getGitLabSubgroups,
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
  errors: Array<string>;
  token?: string;
  gitOwner?: string;
  isGitSelected?: boolean;
}

export const initialState: GitState = {
  githubUser: null,
  githubUserOrganizations: [],
  gitlabUser: null,
  gitlabGroups: [],
  isLoading: false,
  isTokenValid: false,
  errors: [],
};

const gitSlice = createSlice({
  name: 'git',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setGitOwner: (state, action) => {
      state.gitOwner = action.payload;
    },
    clearUserError: (state) => {
      state.errors = [];
    },
    clearGitState: (state) => {
      state.gitOwner = undefined;
      state.githubUser = null;
      state.githubUserOrganizations = [];
      state.gitlabUser = null;
      state.gitlabGroups = [];
      state.isLoading = false;
      state.isTokenValid = false;
      state.errors = [];
      state.token = undefined;
    },
    setIsGitSelected: (state, action) => {
      state.isGitSelected = action.payload;
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
        state.isTokenValid = false;

        if (action.error.message) {
          state.errors.push('Failed to get user');
        }
      })
      .addCase(getGithubUserOrganizations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGithubUserOrganizations.rejected, (state, action) => {
        state.isLoading = false;

        if (action.error.message) {
          state.errors.push('Failed to get users organizations');
        }
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
        if (kubefirstRepos.length) {
          state.errors
            .push(`GitHub organization <a href="https://github.com/${state.gitOwner}" target="_blank"><strong>${state.gitOwner}</strong></a>
             already has repositories named either <strong>gitops</strong> and/or <strong>metaphor</strong>.
             Please remove or rename to continue.`);
        }
      })
      .addCase(getGitHubOrgTeams.fulfilled, (state, { payload: organizationTeams }) => {
        const kubefirstTeams = organizationTeams.filter(({ name }) =>
          KUBEFIRST_TEAMS.includes(name),
        );

        if (kubefirstTeams.length) {
          state.errors
            .push(`GitHub organization <a href="https://github.com/${state.gitOwner}" target="_blank"><strong>${state.gitOwner}</strong></a> 
            already has teams named <strong>admins</strong> and/or <strong>developers</strong>. 
            Please remove or rename them to continue.`);
        }
      })
      /* GitLab */
      .addCase(getGitlabUser.fulfilled, (state, action) => {
        state.gitlabUser = action.payload;
        state.isTokenValid = true;
      })
      .addCase(getGitlabUser.rejected, (state, action) => {
        if (action.error.message) {
          state.errors.push('Failed to get user');
        }
      })
      .addCase(getGitlabGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitlabGroups.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.errors.push('Failed to get user groups');
        }
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

        if (kubefirstRepos.length) {
          state.errors.push(`
            GitLab organization <a href="https://gitlab.com/${state.gitOwner}" target="_blank"><strong>${state.gitOwner}</strong></a>
            already has repositories named either <strong>gitops</strong> and <strong>metaphor</strong>.
          Please remove or rename to continue.`);
        }
      })
      .addCase(getGitLabSubgroups.fulfilled, (state, { payload: gitlabSubgroups }) => {
        const kubefirstTeams = gitlabSubgroups.filter(({ name }) => KUBEFIRST_TEAMS.includes(name));

        if (kubefirstTeams.length) {
          state.errors.push(`
            GitLab organization <a href="https://gitlab.com/${state.gitOwner}" target="_blank"><strong>${state.gitOwner}</strong></a>
            already has teams named <strong>admins</strong> or <strong>developers</strong>. 
            Please remove or rename them to continue.`);
        }
      });
  },
});

export const { clearGitState, clearUserError, setIsGitSelected, setGitOwner, setToken } =
  gitSlice.actions;

export const gitReducer = gitSlice.reducer;
