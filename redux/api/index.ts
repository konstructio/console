import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { ReadinessData } from '../../pages/api/readiness';
import { TelemetryResponseData } from '../../pages/api/telemetry';
import { SendTelemetryArgs } from '../../services/telemetry';

export const consoleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    telemetry: builder.mutation<TelemetryResponseData, SendTelemetryArgs>({
      query: (body) => ({
        url: '/api/telemetry',
        method: 'POST',
        body,
      }),
    }),
    readiness: builder.mutation<ReadinessData, Omit<ReadinessData, 'success'>>({
      query: (body) => ({
        url: '/api/readiness',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { endpoints, useTelemetryMutation, useReadinessMutation } = consoleApi;
