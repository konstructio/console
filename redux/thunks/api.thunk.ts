import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import sortBy from 'lodash/sortBy';

import { AppDispatch, RootState } from '../store';
import {
  Cluster,
  ClusterRequestProps,
  ClusterResponse,
  ClusterServices,
} from '../../types/provision';
import { MarketplaceApp, MarketplaceProps } from '../../types/marketplace';

const mapClusterFromRaw = (cluster: ClusterResponse): Cluster => ({
  id: cluster._id,
  clusterName: cluster.cluster_name,
  adminEmail: cluster.alerts_email,
  cloudProvider: cluster.cloud_provider,
  cloudRegion: cluster.cloud_region,
  domainName: cluster.domain_name,
  gitOwner: cluster.git_owner,
  gitProvider: cluster.git_provider,
  gitUser: cluster.git_user,
  type: cluster.cluster_type,
  creationDate: cluster.creation_timestamp,
  lastErrorCondition: cluster.last_condition,
  status: cluster.status,
  checks: {
    install_tools_check: cluster.install_tools_check,
    domain_liveness_check: cluster.domain_liveness_check,
    state_store_creds_check: cluster.state_store_creds_check,
    state_store_create_check: cluster.state_store_create_check,
    git_init_check: cluster.git_init_check,
    kbot_setup_check: cluster.kbot_setup_check,
    gitops_ready_check: cluster.gitops_ready_check,
    git_terraform_apply_check: cluster.git_terraform_apply_check,
    gitops_pushed_check: cluster.gitops_pushed_check,
    cloud_terraform_apply_check: cluster.cloud_terraform_apply_check,
    cluster_secrets_created_check: cluster.cluster_secrets_created_check,
    argocd_install_check: cluster.argocd_install_check,
    argocd_initialize_check: cluster.argocd_initialize_check,
    argocd_create_registry_check: cluster.argocd_create_registry_check,
    argocd_delete_registry_check: cluster.argocd_delete_registry_check,
    vault_initialized_check: cluster.vault_initialized_check,
    vault_terraform_apply_check: cluster.vault_terraform_apply_check,
    users_terraform_apply_check: cluster.users_terraform_apply_check,
  },
});

export const createCluster = createAsyncThunk<
  Cluster,
  { apiUrl: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/provisioning', async ({ apiUrl }, { getState }) => {
  const {
    installation: { installType, gitProvider, values },
  } = getState();

  const params = {
    clusterName: values?.clusterName,
    admin_email: values?.alertsEmail,
    cloud_provider: installType?.toString(),
    cloud_region: values?.cloudRegion,
    domain_name: values?.domainName,
    git_owner: values?.gitOwner,
    git_provider: gitProvider,
    git_token: values?.gitToken,
    type: 'mgmt',
    aws_auth: {
      ...values?.aws_auth,
    },
    civo_auth: {
      ...values?.civo_auth,
    },
    do_auth: {
      ...values?.do_auth,
    },
    vultr_auth: {
      ...values?.vultr_auth,
    },
  };
  const res = await axios.post(`${apiUrl}/cluster/${values?.clusterName || 'kubefirst'}`, params);

  if ('error' in res) {
    throw res.error;
  }
  return res.data;
});

export const getCluster = createAsyncThunk<
  Cluster,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/get', async ({ apiUrl, clusterName }) => {
  const res = await axios.get(`${apiUrl}/cluster/${clusterName || 'kubefirst'}`);

  if ('error' in res) {
    throw res.error;
  }
  return mapClusterFromRaw(res.data);
});

export const getClusters = createAsyncThunk<
  Array<Cluster>,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/getClusters', async ({ apiUrl }) => {
  const res = await axios.get(`${apiUrl}/cluster`);

  if ('error' in res) {
    throw res.error;
  }

  return (res.data && res.data.map(mapClusterFromRaw)) || [];
});

export const deleteCluster = createAsyncThunk<
  Cluster,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/delete', async ({ apiUrl, clusterName }) => {
  const res = await axios.delete(`${apiUrl}/cluster/${clusterName || 'kubefirst'}`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data;
});

export const getClusterServices = createAsyncThunk<
  Array<ClusterServices>,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/getClusterServices', async ({ clusterName }, { getState }) => {
  const {
    config: { apiUrl },
  } = getState();

  const res = await axios.get(`${apiUrl}/services/${clusterName}`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data?.services;
});

export const getMarketplaceApps = createAsyncThunk<
  Array<MarketplaceApp>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getMarketplaceApps', async (_, { getState }) => {
  const {
    config: { apiUrl },
  } = getState();

  const res = await axios.get(`${apiUrl}/marketplace/apps`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data?.apps;
});

export const installMarketplaceApp = createAsyncThunk<
  MarketplaceApp,
  MarketplaceProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/installMarketplaceApp', async ({ app, clusterName, values }, { getState }) => {
  const {
    config: { apiUrl },
  } = getState();

  const secret_keys =
    values &&
    Object.keys(values as FieldValues).map((key) => ({
      name: key,
      value: (values as FieldValues)[key],
    }));

  const res = await axios.post(`${apiUrl}/services/${clusterName}/${app.name}`, {
    secret_keys,
  });

  if ('error' in res) {
    throw res.error;
  }
  return app;
});

export const getCloudRegions = createAsyncThunk<
  Array<string>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudRegions', async (_, { getState }) => {
  const {
    config: { apiUrl },
    installation: { values, installType },
  } = getState();

  const res = await axios.post<{ regions: Array<string> }>(
    `${apiUrl}/region/${installType}`,
    values,
  );

  if ('error' in res) {
    throw res.error;
  }
  return sortBy(res.data.regions);
});

export const getCloudDomains = createAsyncThunk<
  Array<string>,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudDomains', async (cloudRegion, { getState }) => {
  const {
    config: { apiUrl },
    installation: { values, installType },
  } = getState();

  const res = await axios.post<{ domains: Array<string> }>(`${apiUrl}/domain/${installType}`, {
    ...values,
    cloud_region: cloudRegion,
  });

  if ('error' in res) {
    throw res.error;
  }
  return sortBy(res.data.domains);
});

export const resetClusterProgress = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/resetClusterProgress', async (_, { getState }) => {
  const {
    config: { apiUrl },
    installation: { values },
  } = getState();

  const res = await axios.post<{ regions: Array<string> }>(
    `${apiUrl}/cluster/${values?.clusterName}/reset_progress`,
  );

  if ('error' in res) {
    throw res.error;
  }
});
