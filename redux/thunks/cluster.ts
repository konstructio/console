import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { InstallValues } from '../../types/redux';
import { Cluster, ClusterRequestProps, ClusterResponse } from '../../types/provision';

const mapClusterFromRaw = (cluster: ClusterResponse): Cluster => ({
  id: cluster.ID,
  clusterName: cluster.ClusterName,
  adminEmail: cluster.AlertsEmail,
  cloudProvider: cluster.CloudProvider,
  cloudRegion: cluster.CloudRegion,
  domainName: cluster.DomainName,
  gitOwner: cluster.GitOwner,
  gitProvider: cluster.GitProvider,
  gitUser: cluster.GitUser,
  type: cluster.ClusterType,
  creationDate: cluster.CreationTimestamp,
  status: cluster.Status,
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
