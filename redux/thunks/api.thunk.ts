import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import { sortBy } from 'lodash';

import { AppDispatch, RootState } from '../store';
import { createQueryString } from '../../utils/url/formatDomain';
import {
  ManagementCluster,
  ClusterRequestProps,
  ClusterServices,
  NewWorkloadClusterConfig,
  ClusterType,
  ClusterStatus,
  WorkloadCluster,
  ClusterResponse,
  Cluster,
} from '../../types/provision';
import { GitOpsCatalogApp, GitOpsCatalogProps } from '../../types/gitOpsCatalog';
import { InstallValues, InstallationType } from '../../types/redux';
import { TelemetryClickEvent } from '../../types/telemetry';
import { mapClusterFromRaw } from '../../utils/mapClustersFromRaw';
import { updateDraftCluster } from '../../redux/slices/api.slice';

export const createCluster = createAsyncThunk<
  ManagementCluster,
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
    git_provider: gitProvider,
    gitops_template_url: values?.gitopsTemplateUrl,
    gitops_template_branch: values?.gitopsTemplateBranch,
    git_protocol: values?.useHttps ? 'https' : 'ssh',
    dns_provider: values?.dnsProvider,
    ecr: values?.imageRepository === 'ecr',
    type: 'mgmt',
    git_auth: {
      git_owner: values?.gitOwner,
      git_token: values?.gitToken,
    },
    cloudflare_auth: {
      token: values?.cloudflareToken,
    },
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
  const res = await axios.post<ManagementCluster>('/api/proxy', {
    url: `/cluster/${values?.clusterName || 'kubefirst'}`,
    body: params,
  });

  if ('error' in res) {
    throw res.error;
  }
  return res.data;
});

export const createWorkloadCluster = createAsyncThunk<
  { cluster_id: string },
  NewWorkloadClusterConfig,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/createWorkloadCluster', async (config, { dispatch, getState }) => {
  const { managementCluster } = getState().api;

  const res = await axios.post(`/api/proxy?target=ee`, {
    url: `/cluster/${managementCluster?.id}`,
    body: {
      cluster_name: config.clusterName,
      cloud_region: config.cloudRegion,
      instance_size: config.instanceSize,
      node_count: config.nodeCount,
      environment: config.environment,
      cluster_type: config.type,
    },
  });

  if ('error' in res) {
    throw res.error;
  }

  if (managementCluster && res.data.cluster_id) {
    const updatedCluster: WorkloadCluster = {
      ...config,
      id: res.data.cluster_id,
      type: ClusterType.WORKLOAD,
      status: ClusterStatus.PROVISIONING,
      cloudProvider: managementCluster.cloudProvider,
      adminEmail: managementCluster.adminEmail,
      domainName: managementCluster.domainName,
      gitProvider: managementCluster.gitProvider,
      gitAuth: managementCluster.gitAuth,
    };
    dispatch(updateDraftCluster(updatedCluster));
  }
  return res.data;
});

export const getCluster = createAsyncThunk<
  ManagementCluster,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/get', async ({ clusterName }) => {
  const res = await axios.get(
    `/api/proxy?${createQueryString('url', `/cluster/${clusterName || 'kubefirst'}`)}`,
  );

  if ('error' in res) {
    throw res.error;
  }
  return mapClusterFromRaw(res.data);
});

export const getClusters = createAsyncThunk<
  ManagementCluster,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/getClusters', async () => {
  const res = await axios.get<ClusterResponse[]>(
    `/api/proxy?${createQueryString('url', `/cluster`)}`,
  );

  if ('error' in res) {
    throw res.error;
  }

  const [managementCluster] = res.data
    .filter(({ status }) => status === ClusterStatus.PROVISIONED)
    .map(mapClusterFromRaw);

  return managementCluster;
});

export const deleteCluster = createAsyncThunk<
  WorkloadCluster,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/delete', async (workloadClusterId, { getState }) => {
  const {
    api: { managementCluster },
  } = getState();
  const res = await axios.delete(
    `/api/proxy?${createQueryString(
      'url',
      `/cluster/${managementCluster?.id || 'kubefirst'}/${workloadClusterId}`,
    )}&target=ee`,
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
  const res = await axios.get(`/api/proxy?${createQueryString('url', `/services/${clusterName}`)}`);

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
  const res = await axios.get(`/api/proxy?${createQueryString('url', `/gitops-catalog/apps`)}`);

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
  InstallValues | Cluster,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudRegions', async (values, { getState }) => {
  const {
    installation: { installType },
  } = getState();

  const res = await axios.post<{ regions: Array<string> }>('/api/proxy', {
    url: `/region/${installType || (values as Cluster).cloudProvider}`,
    body: installType === InstallationType.AWS ? { ...values, cloud_region: 'us-east-1' } : values,
  });

  if ('error' in res) {
    throw res.error;
  }
  return sortBy(res.data.regions);
});

export const getCloudDomains = createAsyncThunk<
  Array<string>,
  { region: string; cloudflareToken?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudDomains', async ({ cloudflareToken, region }, { getState }) => {
  const {
    installation: { values, installType },
  } = getState();

  const res = await axios.post<{ domains: Array<string> }>('/api/proxy', {
    url: `/domain/${cloudflareToken ? 'cloudflare' : installType}`,
    body: {
      ...values,
      cloud_region: region,
      cloudflare_auth: {
        token: cloudflareToken,
      },
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
