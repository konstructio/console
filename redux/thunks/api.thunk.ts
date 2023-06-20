import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import sortBy from 'lodash/sortBy';
import queryString from 'query-string';

import { AppDispatch, RootState } from '../store';
import {
  Cluster,
  ClusterRequestProps,
  ClusterResponse,
  ClusterServices,
} from '../../types/provision';
import { GitOpsCatalogApp, GitOpsCatalogProps } from '../../types/gitOpsCatalog';
import { InstallationType } from '../../types/redux';
import { TelemetryClickEvent } from '../../types/telemetry';

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
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/provisioning', async (_, { getState }) => {
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
    gitops_template_url: values?.gitopsTemplateUrl,
    gitops_template_branch: values?.gitopsTemplateBranch,
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
  const res = await axios.post('/api/proxy', {
    url: `/cluster/${values?.clusterName || 'kubefirst'}`,
    body: params,
  });

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
>('api/cluster/get', async ({ clusterName }) => {
  const res = await axios.get(
    `/api/proxy?${queryString.stringify({ url: `/cluster/${clusterName || 'kubefirst'}` })}`,
  );

  if ('error' in res) {
    throw res.error;
  }
  return mapClusterFromRaw(res.data);
});

export const getClusters = createAsyncThunk<
  Array<Cluster>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/getClusters', async () => {
  const res = await axios.get(`/api/proxy?${queryString.stringify({ url: `/cluster` })}`);

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
>('api/cluster/delete', async ({ clusterName }) => {
  const res = await axios.delete(
    `/api/proxy?${queryString.stringify({ url: `/cluster/${clusterName || 'kubefirst'}` })}`,
  );

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
>('api/cluster/getClusterServices', async ({ clusterName }) => {
  const res = await axios.get(
    `/api/proxy?${queryString.stringify({ url: `/services/${clusterName}` })}`,
  );

  if ('error' in res) {
    throw res.error;
  }
  return res.data?.services;
});

export const getGitOpsCatalogApps = createAsyncThunk<
  Array<GitOpsCatalogApp>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getGitOpsCatalogApps', async () => {
  const res = await axios.get(
    `/api/proxy?${queryString.stringify({ url: `/gitops-catalog/apps` })}`,
  );

  if ('error' in res) {
    throw res.error;
  }
  return res.data?.apps;
});

export const installGitOpsApp = createAsyncThunk<
  GitOpsCatalogApp,
  GitOpsCatalogProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/installGitOpsApp', async ({ app, clusterName, values }) => {
  const secret_keys =
    values &&
    Object.keys(values as FieldValues).map((key) => ({
      name: key,
      value: (values as FieldValues)[key],
    }));

  const params = {
    secret_keys,
  };

  const res = await axios.post('/api/proxy', {
    url: `/services/${clusterName}/${app.name}`,
    body: secret_keys?.length ? params : undefined,
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
    installation: { values, installType },
  } = getState();

  const res = await axios.post<{ regions: Array<string> }>('/api/proxy', {
    url: `/region/${installType}`,
    body: installType === InstallationType.AWS ? { ...values, cloud_region: 'us-east-1' } : values,
  });

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
    installation: { values, installType },
  } = getState();

  const res = await axios.post<{ domains: Array<string> }>('/api/proxy', {
    url: `/domain/${installType}`,
    body: {
      ...values,
      cloud_region: cloudRegion,
    },
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
    installation: { values },
  } = getState();

  const res = await axios.post<{ regions: Array<string> }>('/api/proxy', {
    url: `/cluster/${values?.clusterName}/reset_progress`,
  });

  if ('error' in res) {
    throw res.error;
  }
});

export const sendTelemetryEvent = createAsyncThunk<
  void,
  TelemetryClickEvent,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/sendTelemetryEvent', async (body, { getState }) => {
  const {
    cluster: { selectedCluster },
  } = getState();
  const res = await axios.post('/api/proxy', {
    url: `/telemetry/${selectedCluster?.clusterName}`,
    body,
  });

  if ('error' in res) {
    throw res.error;
  }
});
