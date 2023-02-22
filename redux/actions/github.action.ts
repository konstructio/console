/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/github';

const { getUserInfo, getUserOrganizations } = endpoints;

export const getUser = createAsyncThunk(
  'github/getUser',
  async (queryTerm: string, { dispatch }) => {
    const response = await getUserInfo.initiate(queryTerm);
    return dispatch(response).unwrap();
  },
);

export const getGitUserOrganizations = createAsyncThunk(
  'github/getGitUserOrganizations',
  async (queryTerm: string, { dispatch }) => {
    const response = await getUserOrganizations.initiate(queryTerm);

    return dispatch(response).unwrap();
  },
);
