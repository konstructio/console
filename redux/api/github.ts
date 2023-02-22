/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { HYDRATE } from 'next-redux-wrapper';

export const githubApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  extractRehydrationInfo(action: any, { reducerPath }: any) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder: any) => ({
    getUserInfo: builder.query({
      query: (token: string) => ({
        url: '/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserOrganizations: builder.query({
      query: (token: string) => ({
        url: '/user/orgs',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { endpoints } = githubApi;
