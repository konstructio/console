import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { find, get } from 'lodash';

import { ConfigKeys } from '../enums/config';
import IKeyValue from '../types/common';
import { Config } from '../types/config';
import { Services } from '../enums/services';

const {
  ATLANTIS,
  ARGO,
  ARGOCD,
  GITHUB,
  GITLAB,
  METAPHOR,
  METAPHOR_STG,
  METAPHOR_PRODUCTION,
  VAULT,
} = Services;

const {
  ADMIN_EMAIL,
  ATLANTIS_URL,
  ARGO_URL,
  ARGOCD_URL,
  GITHUB_GITOPS,
  GITHUB_METAPHOR,
  GITLAB_URL,
  IS_GITHUB_ENABLED,
  HOSTED_ZONE_NAME,
  METAPHOR_DEV,
  METAPHOR_GO_DEV,
  METAPHOR_FRONT_DEV,
  METAPHOR_STAGING,
  METAPHOR_GO_STAGING,
  METAPHOR_FRONT_STAGING,
  METAPHOR_PROD,
  METAPHOR_GO_PROD,
  METAPHOR_FRONT_PROD,
  VAULT_URL,
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
      transformResponse: (response: Array<ConfigResponse>) => {
        return {
          [ADMIN_EMAIL]: getFromResponse(response, ADMIN_EMAIL),
          [HOSTED_ZONE_NAME]: getFromResponse(response, HOSTED_ZONE_NAME),
          [IS_GITHUB_ENABLED]: getFromResponse(response, IS_GITHUB_ENABLED) === 'true',
          [ATLANTIS]: {
            ATLANTIS_URL: getFromResponse(response, ATLANTIS_URL),
          },
          [ARGO]: {
            ARGO_URL: getFromResponse(response, ARGO_URL),
          },
          [ARGOCD]: {
            ARGOCD_URL: getFromResponse(response, ARGOCD_URL),
          },
          [GITHUB]: {
            GITHUB_GITOPS: getFromResponse(response, GITHUB_GITOPS),
            GITHUB_METAPHOR: getFromResponse(response, GITHUB_METAPHOR),
          },
          [GITLAB]: {
            GITLAB_URL: getFromResponse(response, GITLAB_URL),
          },
          [METAPHOR]: {
            URL: getFromResponse(response, METAPHOR_DEV),
            FRONT_URL: getFromResponse(response, METAPHOR_FRONT_DEV),
            GO_URL: getFromResponse(response, METAPHOR_GO_DEV),
          },
          [METAPHOR_STG]: {
            URL: getFromResponse(response, METAPHOR_STAGING),
            FRONT_URL: getFromResponse(response, METAPHOR_FRONT_STAGING),
            GO_URL: getFromResponse(response, METAPHOR_GO_STAGING),
          },
          [METAPHOR_PRODUCTION]: {
            URL: getFromResponse(response, METAPHOR_PROD),
            FRONT_URL: getFromResponse(response, METAPHOR_FRONT_PROD),
            GO_URL: getFromResponse(response, METAPHOR_GO_PROD),
          },
          [VAULT]: {
            VAULT_URL: getFromResponse(response, VAULT_URL),
          },
        } as Config;
      },
    }),
  }),
});

export const { useGetConfigsQuery, endpoints } = internalApi;
