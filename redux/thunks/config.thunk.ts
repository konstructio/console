import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { EnvironmentVariables, FeatureFlag } from '@/types/config';

export const getFlags = createAsyncThunk<Record<FeatureFlag, boolean>>(
  'config/getFlags',
  async () => {
    const { flags } = (await axios.get<{ flags: Record<FeatureFlag, boolean> }>(`/api/flags`)).data;

    return flags;
  },
);

export const getEnvVariables = createAsyncThunk<EnvironmentVariables>(
  'config/getEnvVariables',
  async () => {
    const configs = (await axios.get<EnvironmentVariables>(`/api/config`)).data;

    return configs;
  },
);
