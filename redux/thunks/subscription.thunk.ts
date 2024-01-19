import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { createNotification } from '../slices/notifications.slice';

import { ClusterUsage, License, UserRequest } from '@/types/subscription';

export const validateLicenseKey = createAsyncThunk<License>(
  'subscription/validateLicenseKey',
  async () => {
    return (
      await axios.post<License>('/api/proxy?target=ee', {
        url: `/subscription/validate`,
      })
    ).data;
  },
);

export const activateLicenseKey = createAsyncThunk<
  License,
  string,
  {
    state: RootState;
  }
>('subscription/activateLicenseKey', async (licenseKey, { getState }) => {
  const { managementCluster } = getState().api;

  return (
    await axios.post<License>('/api/proxy?target=ee', {
      url: `/subscription/${managementCluster?.clusterId}/activateCluster`,
      body: {
        licenseKey,
      },
    })
  ).data;
});

export const getClusterUsage = createAsyncThunk<
  Array<ClusterUsage>,
  string,
  {
    state: RootState;
  }
>('subscription/getCluserUsage', async (licenseKey) => {
  return (
    await axios.post<Array<ClusterUsage>>('/api/proxy?target=ee', {
      url: `/subscription/clusterUsage`,
      body: {
        licenseKey,
      },
    })
  ).data;
});

export const createUserRequest = createAsyncThunk<
  void,
  UserRequest,
  {
    state: RootState;
  }
>('subscription/createUserRequest', async (userRequest, { dispatch }) => {
  await axios.post('/api/proxy?target=ee', {
    url: '/subscription/user-request',
    body: {
      ...userRequest,
    },
  });

  dispatch(
    createNotification({
      message: 'Your message is on it’s way',
      type: 'success',
      snackBarOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    }),
  );
});
