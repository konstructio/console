import { createAsyncThunk } from '@reduxjs/toolkit';
import { Config } from 'src/types/config';

import { endpoints } from '../api/internalApi';

const { getConfigs: getConfigsAPI } = endpoints;

export const getConfigs = createAsyncThunk<Config>('config/getConfigs', async (_, { dispatch }) => {
  const configValues = await getConfigsAPI.initiate({});
  console.log('configValues -->', configValues);
  console.log(await dispatch(configValues).unwrap());
  return dispatch(configValues).unwrap();
});
