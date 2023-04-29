import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { InstallValues } from '../../types/redux';
import { ClusterProps } from '../../types/provision';

export const createCluster = createAsyncThunk<
  { Status: string },
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
  { Status: string },
  ClusterProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/get', async ({ apiUrl, clusterName }) => {
  const res = await axios.get(`${apiUrl}/cluster/${clusterName || 'kubefirst'}`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data;
});

export const deleteCluster = createAsyncThunk<
  { Status: string },
  ClusterProps,
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
