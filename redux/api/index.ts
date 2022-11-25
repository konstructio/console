/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from '@reduxjs/toolkit';

export const consoleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  extractRehydrationInfo(action: AnyAction, { reducerPath }: { reducerPath: string }) {
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
  }),
});

export const { useTrackMutation, endpoints } = consoleApi;
