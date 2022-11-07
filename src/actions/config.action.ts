import { createAsyncThunk } from '@reduxjs/toolkit';

import { setConfigs } from '../slices/config.slice';

export const getConfigs = createAsyncThunk('config/getConfigs', async (_, { dispatch }) => {
  const configValues = window?.__env__ || {};

  return await dispatch(setConfigs(configValues));
});
