import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '@/redux/store';
import {
  ManagementCluster,
  ClusterRequestProps,
  ClusterResponse,
  Cluster,
  ImageRepository,
  ClusterType,
} from '@/types/provision';
import { createQueryString } from '@/utils/url/formatDomain';
import { ClusterCache, ClusterNameCache } from '@/types/redux';
import { InstallValues, InstallationType } from '@/types/redux';
import { TelemetryClickEvent } from '@/types/telemetry';
import { mapClusterFromRaw } from '@/utils/mapClustersFromRaw';
import { setBoundEnvironments } from '@/redux/slices/environments.slice';
import { GitProtocol } from '@/types';

export const createCluster = createAsyncThunk<
  void,
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
    git_protocol: values?.useHttps ? GitProtocol.HTTPS : GitProtocol.SSH,
    dns_provider: values?.dnsProvider,
    ecr: values?.imageRepository === ImageRepository.ECR,
    type: ClusterType.MANAGEMENT,
    force_destroy: values?.forceDestroyTerraform,
    node_type: values?.instanceSize,
    node_count: values?.nodeCount,
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

  await axios.post<{ message: string }>('/api/proxy', {
    url: `/cluster/${values?.clusterName || 'kubefirst'}`,
    body: params,
  });
});

export const createWorkloadCluster = createAsyncThunk<
  string,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/createWorkloadCluster', async (_, { getState }) => {
  const { managementCluster, clusterMap } = getState().api;

  const draftCluster = clusterMap['draft'];

  if (!managementCluster) {
    throw new Error('missing management cluster');
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

  const { cluster_id } = (
    await axios.post<{ cluster_id: string }>(`/api/proxy?target=ee`, {
      url: `/cluster/${managementCluster?.clusterId}`,
      body: {
        cluster_name: draftCluster.clusterName,
        cloud_region: draftCluster.cloudRegion,
        node_type: draftCluster.instanceSize,
        node_count: draftCluster.nodeCount,
        environment: clusterEnvironment,
        cluster_type: draftCluster.type,
      },
    })
  ).data;

  return cluster_id;
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
  const { data } = await axios.get<ClusterResponse>(
    `/api/proxy?${createQueryString('url', `/cluster/${clusterName || 'kubefirst'}`)}`,
  );

  const { managementCluster, envCache, clusterCache, clusterNameCache } = mapClusterFromRaw(data);

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

  if (!res.data || !res.data.length) {
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
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/delete', async (workloadClusterId, { getState }) => {
  const {
    api: { managementCluster },
  } = getState();

  // returned cluster_id is unused at this time.
  await axios.delete<{ cluster_id: string }>(
    `/api/proxy?${createQueryString(
      'url',
      `/cluster/${managementCluster?.clusterId || 'kubefirst'}/${workloadClusterId}`,
    )}&target=ee`,
  );
});

export const getCloudRegions = createAsyncThunk<
  Array<string>,
  { values: InstallValues | Cluster; installType?: InstallationType },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudRegions', async ({ values, installType }) => {
  const { regions } = (
    await axios.post<{ regions: Array<string> }>('/api/proxy', {
      url: `/region/${installType || (values as Cluster).cloudProvider}`,
      body:
        installType === InstallationType.AWS ? { ...values, cloud_region: 'us-east-1' } : values,
    })
  ).data;

  return regions;
});

export const getCloudDomains = createAsyncThunk<
  Array<string>,
  {
    region: string;
    installType?: InstallationType;
    values?: InstallValues;
    cloudflareToken?: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudDomains', async ({ cloudflareToken, installType, values, region }) => {
  const { domains } = (
    await axios.post<{ domains: Array<string> }>('/api/proxy', {
      url: `/domain/${cloudflareToken ? 'cloudflare' : installType}`,
      body: {
        ...values,
        cloud_region: region,
        cloudflare_auth: {
          api_token: cloudflareToken,
        },
      },
    })
  ).data;

  return domains;
});

export const getInstanceSizes = createAsyncThunk<
  string[],
  { region: string; installType?: InstallationType; values?: InstallValues; zone?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getInstanceSizes', async ({ region, installType, values, zone }) => {
  const { instance_sizes } = (
    await axios.post<{ instance_sizes: string[] }>('/api/proxy', {
      url: `/instance-sizes/${installType}`,
      body: {
        ...values,
        cloud_region: region,
        cloud_zone: zone,
      },
    })
  ).data;

  return instance_sizes;
});

// currently only needed for google install type
export const getRegionZones = createAsyncThunk<
  string[],
  { region: string; values?: InstallValues },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getRegionZones', async ({ region, values }) => {
  const { zones } = (
    await axios.post<{ zones: string[] }>('/api/proxy', {
      url: '/zones',
      body: {
        ...values,
        cloud_region: region,
      },
    })
  ).data;

  return zones;
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

  await axios.post<{ regions: Array<string> }>('/api/proxy', {
    url: `/cluster/${values?.clusterName}/reset_progress`,
  });
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

  await axios.post('/api/proxy', {
    url: `/telemetry/${selectedCluster?.clusterName}`,
    body,
  });
});
