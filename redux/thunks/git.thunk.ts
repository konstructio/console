import { createAsyncThunk } from '@reduxjs/toolkit';
import { GitLabGroup, GitLabProject, GitLabUser } from 'types/gitlab';

import { githubApi } from '../../services/github';
import { gitlabApi } from '../../services/gitlab';
import {
  GithubOrganizationRepos,
  GithubOrganizationTeams,
  GithubUser,
  GithubUserOrganization,
} from '../../types/github';

export const getGithubUser = createAsyncThunk<GithubUser, string>(
  'git/getGithubUser',
  async (token) => {
    return (
      await githubApi.get<GithubUser>('/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  },
);

export const getGithubUserOrganizations = createAsyncThunk<GithubUserOrganization[], string>(
  'git/getUserOrganizations',
  async (token) => {
    return (
      await githubApi.get<GithubUserOrganization[]>('/user/orgs?per_page=100', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    ).data;
  },
);

export const getGitHubOrgRepositories = createAsyncThunk<
  GithubOrganizationRepos[],
  { token: string; organization: string }
>('git/getGitHubRepositories', async ({ token, organization }) => {
  return (
    await githubApi.get<GithubOrganizationRepos[]>(`/orgs/${organization}/repos?per_page=100`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  ).data;
});

export const getGitHubOrgTeams = createAsyncThunk<
  GithubOrganizationTeams[],
  { token: string; organization: string }
>('git/getGitHubOrgTeams', async ({ token, organization }) => {
  return (
    await githubApi.get<GithubOrganizationTeams[]>(`/orgs/${organization}/teams`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  ).data;
});

export const getGitlabUser = createAsyncThunk<GitLabUser, string>(
  'git/getGitlabUser',
  async (token) => {
    return (
      await gitlabApi.get<GitLabUser>('/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  },
);

export const getGitlabGroups = createAsyncThunk<GitLabGroup[], string>(
  'git/getGitlabGroups',
  async (token) => {
    return (
      await gitlabApi.get<GitLabGroup[]>('/groups?per_page=100&top_level_only=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  },
);

export const getGitLabSubgroups = createAsyncThunk<GitLabGroup[], { token: string; group: string }>(
  'git/getGitLabSubgroups',
  async ({ token, group }) => {
    return (
      await gitlabApi.get<GitLabGroup[]>(`/groups/${group}/subgroups?per_page=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  },
);

export const getGitLabProjects = createAsyncThunk<
  GitLabProject[],
  { token: string; group: string }
>('git/getGitLabProjects', async ({ token, group }) => {
  return (
    await gitlabApi.get<GitLabProject[]>(`/groups/${group}/projects?per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
});
