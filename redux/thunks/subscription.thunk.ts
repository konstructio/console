import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const activateLicenseKey = createAsyncThunk<License, string>(
  'subscription/activateLicenseKey',
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
