import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/';
import { AppDispatch, RootState } from '../store';
import { ReadinessData } from '../../pages/api/readiness';

export const checkSiteReadiness = createAsyncThunk<
  ReadinessData,
  Omit<ReadinessData, 'success'>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('readiness/check', async (body, { dispatch, getState }) => {
  const state = getState();

  if (body.url.includes(state.config.k3dDomain || 'localdev.me')) {
    await fetch(body.url, { mode: 'no-cors' });
    return { success: true, url: body.url };
  } else {
    const res = await dispatch(endpoints.readiness.initiate(body));
    if ('error' in res) {
      throw res.error;
    }
    return res.data;
  }
});
