import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { ReadinessData } from '@/pages/api/readiness';

export const consoleApi = createApi({
  reducerPath: 'internalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    readiness: builder.mutation<ReadinessData, Omit<ReadinessData, 'success'>>({
      query: (body) => ({
        url: '/api/readiness',
        method: 'POST',
        body,
        timeout: 3000,
      }),
    }),
  }),
});

export const { endpoints, useReadinessMutation } = consoleApi;
