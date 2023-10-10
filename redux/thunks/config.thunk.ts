import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Flags, EnvironmentVariables } from '@/types/config';

export const getFlags = createAsyncThunk<Flags>('config/getFlags', async () => {
  const flags = (await axios.get<Flags>(`/api/flags`)).data;

  return flags;
});

export const getEnvVariables = createAsyncThunk<EnvironmentVariables>(
  'config/getEnvVariables',
  async () => {
    const configs = (await axios.get<EnvironmentVariables>(`/api/config`)).data;

    return configs;
  },
);
