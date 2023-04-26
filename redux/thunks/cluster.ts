import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api';
import { AppDispatch, RootState } from '../store';

export const createCluster = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/provisioning', async (body, { dispatch }) => {
  const res = await axios.post(
    `http://localhost:8081/api/v1/cluster/${body.clusterName || 'kubefirst'}`,
    body,
  );

  if ('error' in res) {
    throw res.error;
  }
  return res.data;
});
