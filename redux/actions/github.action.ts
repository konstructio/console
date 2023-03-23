/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/github';

const { getUserInfo, getUserOrganizations } = endpoints;

export const getUser = createAsyncThunk('github/getUser', async (queryTerm: string) => {
  return await getUserInfo.initiate(queryTerm);
});

export const getGitUserOrganizations = createAsyncThunk(
  'github/getGitUserOrganizations',
  async (queryTerm: string) => {
    return await getUserOrganizations.initiate(queryTerm);
  },
);
