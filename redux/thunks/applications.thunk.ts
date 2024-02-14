import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { createQueryString } from '../../utils/url/formatDomain';
import { ClusterRequestProps } from '../../types/provision';
import { GitOpsCatalogApp, GitOpsCatalogProps, ClusterApplication } from '../../types/applications';
import { addAppToQueue, removeAppFromQueue } from '../slices/applications.slice';
import { transformObjectToStringKey } from '../../utils/transformObjectToStringKey';
import { createNotification } from '../slices/notifications.slice';

// isTemplate

export const installGitOpsApp = createAsyncThunk<
  GitOpsCatalogApp,
  GitOpsCatalogProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('applications/installGitOpsApp', async ({ app, clusterName, values }, { dispatch }) => {
  dispatch(addAppToQueue(app));
  const formValues = values && transformObjectToStringKey(values);

  const keys = formValues && Object.keys(formValues);

  const secret_keys =
    app.secret_keys &&
    app.secret_keys
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const config_keys =
    app.config_keys &&
    app.config_keys
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const params = {
    config_keys,
    secret_keys,
    // sending both management and workload cluster name with request for workload
    // workload_cluster_name?: String
    // is_template: boolean
  };

  const res = await axios.post('/api/proxy', {
    // same for delete gitops app
    url: `/services/${clusterName}/${app.name}`, // always management
    body: secret_keys?.length || config_keys?.length ? params : undefined,
  });

  if ('error' in res) {
    dispatch(removeAppFromQueue(app));
    throw res.error;
  }

  dispatch(
    createNotification({
      message: `${app.display_name} successfully added to provisioned services in cluster ${clusterName}!`,
      type: 'success',
      snackBarOrigin: { vertical: 'bottom', horizontal: 'right' },
    }),
  );

  return app;
});

export const getClusterApplications = createAsyncThunk<
  ClusterApplication[],
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('applications/getClusterApplications', async ({ clusterName }) => {
  return (
    await axios.get<{ services: ClusterApplication[] }>(
      `/api/proxy?${createQueryString('url', `/services/${clusterName}`)}`,
    )
  ).data.services;
});

export const getGitOpsCatalogApps = createAsyncThunk<
  GitOpsCatalogApp[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('applications/getGitOpsCatalogApps', async () => {
  return (
    await axios.get<{ apps: GitOpsCatalogApp[] }>(
      `/api/proxy?${createQueryString('url', `/gitops-catalog/apps`)}`,
    )
  ).data.apps;
});
