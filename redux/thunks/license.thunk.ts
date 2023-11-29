import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { License } from '@/types/license';

export const getLicenseKey = createAsyncThunk<License>('license/getLicenseKey', async () => {
  const result = await axios.get<License>('/api/proxy?target=ee', {
    url: `/subscription`,
  });

  if ('error' in result) {
    throw result.error;
  }

  return result.data;
});

export const activateLicenseKey = createAsyncThunk<License, string>(
  'license/activateLicenseKey',
  async (licenseKey) => {
    const result = await axios.post<License>('/api/proxy?target=ee', {
      url: `/subscription/yor8bq/activateCluster`,
      body: {
        licenseKey,
      },
    });

    if ('error' in result) {
      throw result.error;
    }

    return result.data;
  },
);
