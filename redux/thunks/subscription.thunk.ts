import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

import { License } from '@/types/subscription';

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
