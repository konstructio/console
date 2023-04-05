import { createAsyncThunk } from '@reduxjs/toolkit';

import { githubApi } from '../../api';
import { GithubUser, GithubUserOrganization } from '../../types/github';

export const getUser = createAsyncThunk<GithubUser, string>('github/getUser', async (token) => {
  return (
    await githubApi.get<GithubUser>('/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
});

export const getUserOrganizations = createAsyncThunk<GithubUserOrganization[], string>(
  'github/getUserOrganizations',
  async (token) => {
    return (
      await githubApi.get<GithubUserOrganization[]>('/user/orgs', {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  },
);
