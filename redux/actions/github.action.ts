import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/github';

const { getUserInfo, getUserOrganizations } = endpoints;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = createAsyncThunk<any, string>(
  'github/getUser',
  async (queryTerm, { dispatch }) => {
    const user = await getUserInfo.initiate(queryTerm);
    return dispatch(user).unwrap();
  },
);

export const getGitUserOrganizations = createAsyncThunk<any, string>(
  'github/getGitUserOrganizations',
  async (queryTerm, { dispatch }) => {
    const organizations = await getUserOrganizations.initiate(queryTerm);
    return dispatch(organizations).unwrap();
  },
);
