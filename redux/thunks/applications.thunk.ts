import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';

import { AppDispatch, RootState } from '../store';
import { createQueryString } from '../../utils/url/formatDomain';
import { ClusterRequestProps } from '../../types/provision';
import { GitOpsCatalogApp, ClusterApplication, Target } from '../../types/applications';
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
  const {
    applications: { selectedCatalogApp, filter },
    api: { managementCluster, clusterMap },
  } = getState();

  if (!selectedCatalogApp) {
    throw new Error('missing selected catalog app');
  }

  const formValues = transformObjectToStringKey(values);

  const keys = Object.keys(formValues);

  const getMapValues = (values: Array<{ name: string; label: string }> | undefined) =>
    values &&
    values
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const secret_keys = getMapValues(selectedCatalogApp.secret_keys);
  const config_keys = getMapValues(selectedCatalogApp.config_keys);

  const cluster = clusterMap[filter.cluster as string];

  const params = {
    config_keys,
    secret_keys,
    user,
    is_template: filter.target === Target.TEMPLATE,
    workload_cluster_name: filter.cluster,
    environment: cluster?.environment?.name,
  };

  // Removing workload_cluster_name for management cluster installations
  if (managementCluster?.clusterName === filter.cluster) {
    delete params.workload_cluster_name;
  }

  dispatch(addAppToQueue(selectedCatalogApp));

  const res = await axios.post('/api/proxy', {
    // same for delete gitops app
    url: `/services/${managementCluster?.clusterName}/${selectedCatalogApp.name}`,
    body: params,
  });

  if ('error' in res) {
    dispatch(removeAppFromQueue(selectedCatalogApp));
    throw res.error;
  }

  dispatch(
    createNotification({
      message: `${selectedCatalogApp.display_name} successfully added to provisioned services in cluster ${filter.cluster}!`,
      type: 'success',
      snackBarOrigin: { vertical: 'bottom', horizontal: 'right' },
    }),
  );

  dispatch(getClusterApplications({ clusterName: filter.cluster }));

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
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('applications/getGitOpsCatalogApps', async (cloudProvider, { getState }) => {
  const {
    api: { managementCluster },
  } = getState();

  return (
    await axios.get<{ apps: GitOpsCatalogApp[] }>(
      `/api/proxy?${createQueryString(
        'url',
        `/gitops-catalog/${managementCluster?.clusterName}/${cloudProvider}/apps`,
      )}`,
    )
  ).data.apps;
});

export const uninstallGitOpsApp = createAsyncThunk<
  void,
  { application: ClusterApplication; user: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('applications/uninstallGitOpsApp', async ({ application, user }, { dispatch, getState }) => {
  const {
    applications: { filter },
    api: { managementCluster },
  } = getState();

  if (!application) {
    throw new Error('missing selected catalog app');
  }

  const params = {
    user,
    is_template: filter.target === Target.TEMPLATE,
    workload_cluster_name: filter.cluster,
  };

  // Removing workload_cluster_name for management cluster installations
  if (managementCluster?.clusterName === filter.cluster) {
    delete params.workload_cluster_name;
  }

  await axios.delete('/api/proxy', {
    data: {
      url: `/services/${managementCluster?.clusterName}/${application.name}`,
      body: params,
    },
  });

  dispatch(getClusterApplications({ clusterName: filter.cluster }));
  dispatch(
    createNotification({
      message: `${application.name} successfully uninstalled from cluster ${filter.cluster}!`,
      type: 'success',
      snackBarOrigin: { vertical: 'bottom', horizontal: 'right' },
    }),
  );
});
