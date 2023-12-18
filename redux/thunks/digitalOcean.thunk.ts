import { createAsyncThunk } from '@reduxjs/toolkit';

import { digitalOceanApi } from '@/services/digitalOcean';
import { DigitalOceanUser } from '@/types/digitalOcean';

export const getDigitalOceanUser = createAsyncThunk<DigitalOceanUser, string>(
  'git/getDigitalOceanUser',
  async (token) => {
    return (
      await digitalOceanApi.get<{ account: DigitalOceanUser }>('/account', {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data.account;
  },
);
