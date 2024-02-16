import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';

import { AppDispatch, RootState } from '../store';
import { createQueryString } from '../../utils/url/formatDomain';
import { ClusterRequestProps } from '../../types/provision';
import { GitOpsCatalogApp, ClusterApplication } from '../../types/applications';
import { addAppToQueue, removeAppFromQueue } from '../slices/applications.slice';
import { transformObjectToStringKey } from '../../utils/transformObjectToStringKey';
import { createNotification } from '../slices/notifications.slice';

export const installGitOpsApp = createAsyncThunk<
  GitOpsCatalogApp,
  { values: FieldValues; user: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('applications/installGitOpsApp', async ({ values, user }, { dispatch, getState }) => {
  const { selectedCatalogApp, selectedCluster } = getState().applications;
  if (!selectedCatalogApp) {
    throw new Error('missing selected catalog app');
  }
  if (!selectedCluster) {
    throw new Error('missing selected cluster');
  }
  if (!values) {
    throw new Error('missing form values for selected catalog app');
  }

  const formValues = transformObjectToStringKey(values);

  const keys = Object.keys(formValues);

  const secret_keys =
    selectedCatalogApp.secret_keys &&
    selectedCatalogApp.secret_keys
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const config_keys =
    selectedCatalogApp.config_keys &&
    selectedCatalogApp.config_keys
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const params = {
    config_keys,
    secret_keys,
    user,
  };

  dispatch(addAppToQueue(selectedCatalogApp));

  const res = await axios.post('/api/proxy', {
    // same for delete gitops app
    url: `/services/${selectedCluster.clusterName}/${selectedCatalogApp.name}`, // always management
    body: secret_keys?.length || config_keys?.length ? params : undefined,
  });

  if ('error' in res) {
    dispatch(removeAppFromQueue(selectedCatalogApp));
    throw res.error;
  }

  dispatch(
    createNotification({
      message: `${selectedCatalogApp.display_name} successfully added to provisioned services in cluster ${selectedCluster.clusterName}!`,
      type: 'success',
      snackBarOrigin: { vertical: 'bottom', horizontal: 'right' },
    }),
  );

  return selectedCatalogApp;
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
