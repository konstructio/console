import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ClusterEnvironment, EnvironmentResponse } from '../../types/provision';
import { createQueryString } from '../../utils/url/formatDomain';
import { mapEnvironmentFromRaw } from '../../utils/mapEnvironmentFromRaw';
import { createNotification } from '../../redux/slices/notifications.slice';
import { EnvMap } from '../../redux/slices/environments.slice';
import { createEnvMap } from '../../utils/createEnvMap';

export const getAllEnvironments = createAsyncThunk<EnvMap, void>(
  'environments/getAllEnvironments',
  async () => {
    const rawEnvironments = (
      await axios.get<EnvironmentResponse[]>(
        `/api/proxy?${createQueryString('url', `/environment`)}`,
      )
    ).data;

    return createEnvMap(rawEnvironments);
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

export const deleteEnvironment = createAsyncThunk<ClusterEnvironment['id'], ClusterEnvironment>(
  'environments/deleteEnvironment',
  async (environment, { dispatch }) => {
    await axios.delete(`/api/proxy?${createQueryString('url', `/environment/${environment.id}`)}`);

    dispatch(
      createNotification({
        message: `${environment.name} environment successfully deleted.`,
        type: 'success',
        snackBarOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );

    return environment.id;
  },
);
