import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

import { License } from '@/types/subscription';

export const validateLicenseKey = createAsyncThunk<License>(
  'subscription/validateLicenseKey',
  async () => {
    const result = await axios.post<License>('/api/proxy?target=ee', {
      url: `/subscription/validate`,
    });

    if ('error' in result) {
      throw result.error;
    }

    return result.data;
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

  const result = await axios.post<License>('/api/proxy?target=ee', {
    url: `/subscription/${managementCluster?.clusterId}/activateCluster`,
    body: {
      licenseKey,
    },
  });

  if ('error' in result) {
    throw result.error;
  }

  return result.data;
});
