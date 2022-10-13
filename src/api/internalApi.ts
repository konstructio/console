import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { find, get } from 'lodash';

import { ConfigKeys } from '../enums/config';
import IKeyValue from '../types/common';
import { Config } from '../types/config';

const { ADMIN_EMAIL, HOSTED_ZONE_NAME, GITHUB_HOST, GITHUB_OWNER } = ConfigKeys;

const INTERNAL_API_URL = `${window.location.protocol}//${window.location.hostname}:9095`;

type ConfigResponse = IKeyValue<{ [key: string]: string }>;
const getFromResponse = (response: Array<ConfigResponse>, key: string) => {
  const config = find(response, { key }) || {};
  return get(config, 'value', '');
};

export const internalApi = createApi({
  reducerPath: 'internalApi',
  baseQuery: fetchBaseQuery({ baseUrl: INTERNAL_API_URL }),
  endpoints: (builder) => ({
    getConfigs: builder.query({
      query: () => '/configs',
      transformResponse: (response: Array<ConfigResponse>) =>
        ({
          [ADMIN_EMAIL]: getFromResponse(response, ADMIN_EMAIL),
          [HOSTED_ZONE_NAME]: getFromResponse(response, HOSTED_ZONE_NAME),
          [GITHUB_HOST]: getFromResponse(response, GITHUB_HOST),
          [GITHUB_OWNER]: getFromResponse(response, GITHUB_OWNER),
        } as Config),
    }),
  }),
});

export const { useGetConfigsQuery, endpoints } = internalApi;
