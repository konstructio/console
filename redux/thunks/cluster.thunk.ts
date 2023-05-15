import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { Cluster, ClusterRequestProps, ClusterResponse } from '../../types/provision';

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
>('cluster/provisioning', async ({ apiUrl }, { getState }) => {
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
    digitalocean_auth: {
      ...values?.digitalocean_auth,
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
>('cluster/get', async ({ apiUrl, clusterName }) => {
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
>('cluster/getClusters', async ({ apiUrl }) => {
  const res = await axios.get(`${apiUrl}/cluster`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data.map(mapClusterFromRaw);
});

export const deleteCluster = createAsyncThunk<
  Cluster,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/delete', async ({ apiUrl, clusterName }) => {
  const res = await axios.delete(`${apiUrl}/cluster/${clusterName || 'kubefirst'}`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data;
});
