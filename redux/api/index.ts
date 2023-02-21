/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { HYDRATE } from 'next-redux-wrapper';

export const consoleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  extractRehydrationInfo(action: any, { reducerPath }: any) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder: any) => ({
    track: builder.mutation({
      query: (body: unknown) => ({
        url: '/api/telemetry',
        method: 'POST',
        body,
      }),
    }),
    readiness: builder.mutation({
      query: (body: unknown) => ({
        url: '/api/readiness',
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useTrackMutation, useReadinessMutation, endpoints } = consoleApi;
