import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ClusterEnvironment, EnvironmentResponse } from '../../types/provision';
import { createQueryString } from '../../utils/url/formatDomain';
import { mapEnvironmentFromRaw } from '../../utils/mapEnvironmentFromRaw';

export const getAllEnvironments = createAsyncThunk<ClusterEnvironment[], void>(
  'environments/getAllEnvironments',
  async () => {
    const rawEnvironments = (
      await axios.get<EnvironmentResponse[]>(
        `/api/proxy?${createQueryString('url', `/environment`)}`,
      )
    ).data;
    return rawEnvironments.map(mapEnvironmentFromRaw);
  },
);

export const createEnvironment = createAsyncThunk<ClusterEnvironment, ClusterEnvironment>(
  'environments/createEnvironment',
  async (environment) => {
    const newEnv = (
      await axios.post<EnvironmentResponse>('/api/proxy', {
        url: '/environment',
        body: environment,
      })
    ).data;

    return mapEnvironmentFromRaw(newEnv);
  },
);

export const deleteEnvironment = createAsyncThunk<
  ClusterEnvironment['name'],
  ClusterEnvironment['name']
>('environments/deleteEnvironment', async (environmentName) => {
  await axios.delete(`/api/proxy?${createQueryString('url', `/environment/${environmentName}`)}`);

  return environmentName;
});
