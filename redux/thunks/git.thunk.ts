import { createAsyncThunk } from '@reduxjs/toolkit';
import { GitLabGroup, GitLabUser } from 'types/gitlab';

import { githubApi } from '../../services/github';
import { gitlabApi } from '../../services/gitlab';
import { GithubUser, GithubUserOrganization } from '../../types/github';

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
      await githubApi.get<GithubUserOrganization[]>('/user/orgs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    ).data;
  },
);

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
      await gitlabApi.get<GitLabGroup[]>('/groups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  },
);
