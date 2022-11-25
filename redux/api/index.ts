import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { HYDRATE } from 'next-redux-wrapper';

export const consoleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    track: builder.mutation({
      query: (body) => ({
        url: '/api/telemetry',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useTrackMutation, endpoints } = consoleApi;
