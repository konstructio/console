import { createAsyncThunk } from '@reduxjs/toolkit';

import { sendReadinessEvent } from '../api/';
import { AppDispatch, RootState } from '../store';

export const checkSiteReadiness = createAsyncThunk<
  { success: boolean; url: string },
  { url: string },
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
    const res = await dispatch(sendReadinessEvent(body));
    if ('error' in res) {
      throw res.error;
    }
    return res.data;
  }
});
