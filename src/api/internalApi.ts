import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { find, get } from 'lodash';

import { ConfigKeys } from '../enums/config';
import IKeyValue from '../types/common';
import { Config } from '../types/config';

const {
  ADMIN_EMAIL,
  CLUSTER_NAME,
  HOSTED_ZONE_NAME,
  GITHUB_HOST,
  GITHUB_OWNER,
  ARGO_WORKFLOWS_URL,
  VAULT_URL,
  ARGO_CD_URL,
  ATLANTIS_URL,
  METAPHOR_DEV,
  METAPHOR_GO_DEV,
  METAPHOR_FRONT_DEV,
  METAPHOR_STAGING,
  METAPHOR_GO_STAGING,
  METAPHOR_FRONT_STAGING,
  METAPHOR_PROD,
  METAPHOR_GO_PROD,
  METAPHOR_FRONT_PROD,
} = ConfigKeys;

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
          [CLUSTER_NAME]: getFromResponse(response, CLUSTER_NAME),
          [ARGO_WORKFLOWS_URL]: getFromResponse(response, ARGO_WORKFLOWS_URL),
          [VAULT_URL]: getFromResponse(response, VAULT_URL),
          [ARGO_CD_URL]: getFromResponse(response, ARGO_CD_URL),
          [ATLANTIS_URL]: getFromResponse(response, ATLANTIS_URL),
          [METAPHOR_DEV]: getFromResponse(response, METAPHOR_DEV),
          [METAPHOR_GO_DEV]: getFromResponse(response, METAPHOR_GO_DEV),
          [METAPHOR_FRONT_DEV]: getFromResponse(response, METAPHOR_FRONT_DEV),
          [METAPHOR_STAGING]: getFromResponse(response, METAPHOR_STAGING),
          [METAPHOR_GO_STAGING]: getFromResponse(response, METAPHOR_GO_STAGING),
          [METAPHOR_FRONT_STAGING]: getFromResponse(response, METAPHOR_FRONT_STAGING),
          [METAPHOR_PROD]: getFromResponse(response, METAPHOR_PROD),
          [METAPHOR_GO_PROD]: getFromResponse(response, METAPHOR_GO_PROD),
          [METAPHOR_FRONT_PROD]: getFromResponse(response, METAPHOR_FRONT_PROD),
        } as Config),
    }),
  }),
});

export const { useGetConfigsQuery, endpoints } = internalApi;
