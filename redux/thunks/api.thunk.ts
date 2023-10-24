import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { AppDispatch, RootState } from '@/redux/store';
import {
  ManagementCluster,
  ClusterRequestProps,
  ClusterStatus,
  WorkloadCluster,
  ClusterResponse,
  Cluster,
  ClusterEnvironment,
} from '@/types/provision';
import { createQueryString } from '@/utils/url/formatDomain';
import { ClusterCache, ClusterNameCache } from '@/types/redux';
import { InstallValues, InstallationType } from '@/types/redux';
import { TelemetryClickEvent } from '@/types/telemetry';
import { mapClusterFromRaw } from '@/utils/mapClustersFromRaw';
import { setBoundEnvironments } from '@/redux/slices/environments.slice';

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
    subdomain_name: values?.subDomain,
    git_provider: gitProvider,
    gitops_template_url: values?.gitopsTemplateUrl,
    gitops_template_branch: values?.gitopsTemplateBranch,
    git_protocol: values?.useHttps ? 'https' : 'ssh',
    dns_provider: values?.dnsProvider,
    ecr: values?.imageRepository === 'ecr',
    type: 'mgmt',
    force_destroy: values?.forceDestroyTerraform,
    git_auth: {
      git_owner: values?.gitOwner,
      git_token: values?.gitToken,
    },
    cloudflare_auth: {
      api_token: values?.cloudflareToken,
      origin_ca_issuer_key: values?.cloudflareOriginCaIssuerKey,
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
    google_auth: {
      ...values?.google_auth,
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
  WorkloadCluster,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/createWorkloadCluster', async (_, { getState }) => {
  const { managementCluster, clusterMap } = getState().api;

  const draftCluster = clusterMap['draft'];

  if (!managementCluster) {
    throw new Error('missing managament cluster');
  }

  if (!draftCluster) {
    throw new Error('missing draft cluster');
  }

  const clusterEnvironment = !draftCluster.environment
    ? undefined
    : {
        name: draftCluster.environment?.name,
        color: draftCluster.environment?.color,
        description: draftCluster.environment?.description,
      };

  const res = await axios.post<{ cluster_id: string }>(`/api/proxy?target=ee`, {
    url: `/cluster/${managementCluster?.clusterId}`,
    body: {
      cluster_name: draftCluster.clusterName,
      cloud_region: draftCluster.cloudRegion,
      instance_size: draftCluster.instanceSize,
      node_count: draftCluster.nodeCount,
      environment: clusterEnvironment,
      cluster_type: draftCluster.type,
    },
  });

  if ('error' in res) {
    throw res.error;
  }

  const updatedCluster: WorkloadCluster = {
    ...draftCluster,
    clusterId: res.data.cluster_id,
    status: ClusterStatus.PROVISIONING,
    environment: draftCluster.environment as ClusterEnvironment,
  };

  return updatedCluster;
});

export const getCluster = createAsyncThunk<
  {
    managementCluster: ManagementCluster;
    clusterCache: ClusterCache;
    clusterNameCache: ClusterNameCache;
  },
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/get', async ({ clusterName }, { dispatch }) => {
  const res = await axios.get(
    `/api/proxy?${createQueryString('url', `/cluster/${clusterName || 'kubefirst'}`)}`,
  );

  if ('error' in res) {
    throw res.error;
  }
  const { managementCluster, envCache, clusterCache, clusterNameCache } = mapClusterFromRaw(
    res.data,
  );
  dispatch(setBoundEnvironments(envCache));

  return { managementCluster, clusterCache, clusterNameCache };
});

export const getClusters = createAsyncThunk<
  {
    managementCluster: ManagementCluster;
    clusterCache: ClusterCache;
    clusterNameCache: ClusterNameCache;
  },
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/getClusters', async (_, { dispatch }) => {
  const res = await axios.get<ClusterResponse[]>(
    `/api/proxy?${createQueryString('url', `/cluster`)}`,
  );

  if ('error' in res) {
    throw res.error;
  }

  if (!res.data) {
    throw new Error('No clusters found');
  }

  // only process single expected management cluster
  const { managementCluster, envCache, clusterCache, clusterNameCache } = mapClusterFromRaw(
    res.data[0],
  );
  dispatch(setBoundEnvironments(envCache));

  return { managementCluster, clusterCache, clusterNameCache };
});

export const deleteCluster = createAsyncThunk<
  Cluster['clusterId'],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/delete', async (workloadClusterId, { getState }) => {
  const {
    api: { managementCluster },
  } = getState();

  const res = await axios.delete<{ cluster_id: string }>(
    `/api/proxy?${createQueryString(
      'url',
      `/cluster/${managementCluster?.clusterId || 'kubefirst'}/${workloadClusterId}`,
    )}&target=ee`,
  );

  if ('error' in res) {
    throw res.error;
  }

  return res.data.cluster_id;
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
    body: values,
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
        api_token: cloudflareToken,
      },
    },
  });

  if ('error' in res) {
    throw res.error;
  }
  return sortBy(res.data.domains);
});

export const getInstanceSizes = createAsyncThunk<
  string[],
  { region: string; zone?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getInstanceSizes', async ({ region, zone }, { getState }) => {
  const {
    installation: { installType, values },
  } = getState();

  const { data } = await axios.post<{ instance_sizes: string[] }>('/api/proxy', {
    url: `/instance-sizes/${installType}`,
    body: {
      ...values,
      cloud_region: region,
      cloud_zone: zone,
    },
  });

  return data.instance_sizes;
});

// currently only needed for google install type
export const getRegionZones = createAsyncThunk<
  string[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getRegionZones', async (region, { getState }) => {
  const {
    installation: { values },
  } = getState();

  const { data } = await axios.post<{ zones: string[] }>('/api/proxy', {
    url: '/zones',
    body: {
      ...values,
      cloud_region: region,
    },
  });

  return data.zones;
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
