import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { InstallValues } from '../../types/redux';
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
  status: cluster.status,
});

export const createCluster = createAsyncThunk<
  Cluster,
  { apiUrl: string; values: InstallValues },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/provisioning', async ({ apiUrl, values }) => {
  const res = await axios.post(`${apiUrl}/cluster/${values.clusterName || 'kubefirst'}`, values);

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
