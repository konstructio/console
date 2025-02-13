import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { clearError, setError, setInstallationStep } from '../slices/installation.slice';

import { AppDispatch, RootState } from '@/redux/store';
import {
  ClusterResponse,
  Cluster,
  ImageRepository,
  ClusterType,
  ClusterStatus,
  ClusterQueue,
  ManagementCluster,
} from '@/types/provision';
import { createQueryString } from '@/utils/url/formatDomain';
import { InstallValues, InstallationType } from '@/types/redux';
import { TelemetryClickEvent } from '@/types/telemetry';
import { mapClusterFromRaw } from '@/utils/mapClustersFromRaw';
import { GitProtocol } from '@/types';
import { AUTHENTICATION_ERROR_MSG } from '@/constants';

export const createCluster = createAsyncThunk<
  ClusterQueue,
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
    ami_type: values?.amiType,
    node_count: values?.nodeCount,
    azure_dns_zone_resource_group: values?.resourceGroup,
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
    akamai_auth: {
      ...values?.akamai_auth,
    },
    azure_auth: {
      ...values?.azure_auth,
    },
    log_file: `log_${new Date().getTime()}.log`,
    install_kubefirst_pro: !values?.skipInstallPro,
  };

  await axios.post<{ message: string }>('/api/proxy', {
    url: `/cluster/${values?.clusterName}`,
    body: params,
  });

  return { clusterName: values?.clusterName as string, status: ClusterStatus.PROVISIONING };
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

  if (!res.data || !res.data.length) {
    throw new Error('No clusters found');
  }

  // only process single expected management cluster
  return mapClusterFromRaw(res.data[0]);
});

export const getCloudRegions = createAsyncThunk<
  Array<string>,
  { values: InstallValues | Cluster; installType?: InstallationType; validate: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudRegions', async ({ values, installType, validate }, { getState, dispatch }) => {
  try {
    const { installation } = getState();
    const { regions } = (
      await axios.post<{ regions: Array<string> }>('/api/proxy', {
        url: `/region/${installType || (values as Cluster).cloudProvider}`,
        body:
          installType === InstallationType.AWS ? { ...values, cloud_region: 'us-east-1' } : values,
      })
    ).data;

    if (validate) {
      dispatch(setInstallationStep(installation.installationStep + 1));
      dispatch(clearError());
    }
    return regions;
  } catch (error) {
    dispatch(setError({ error: AUTHENTICATION_ERROR_MSG }));
    throw new Error('Failed to fetch cloud regions');
  }
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
        resource_group: values?.resourceGroup,
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
  {
    region: string;
    installType?: InstallationType;
    values?: InstallValues;
    zone?: string;
    amiType?: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getInstanceSizes', async ({ region, installType, values, zone, amiType }) => {
  const { instance_sizes } = (
    await axios.post<{ instance_sizes: string[] }>('/api/proxy', {
      url: `/instance-sizes/${installType}`,
      body: {
        ...values,
        cloud_region: region,
        cloud_zone: zone,
        ami_type: amiType,
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
  const { managementCluster } = getState().api;

  await axios.post<{ regions: Array<string> }>('/api/proxy', {
    url: `/cluster/${managementCluster?.clusterName}/reset_progress`,
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
  const { managementCluster } = getState().api;

  await axios.post('/api/proxy', {
    url: `/telemetry/${managementCluster?.clusterName}`,
    body,
  });
});
