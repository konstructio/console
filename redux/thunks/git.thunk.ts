import { createAsyncThunk } from '@reduxjs/toolkit';

import { githubApi } from '../../api';
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
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', "X-GitHub-Api-Version": "2022-11-28" },
      })
    ).data;
  },
);
