import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/';
import { setAvailableSite } from '../../redux/slices/readiness.slice';
import { RootState } from '../store';

const { readiness } = endpoints;

export const checkReadiness = createAsyncThunk<
  { success: boolean; url: string },
  { url: string },
  { state: RootState }
>('readiness/check', async (body, { dispatch, getState }) => {
  const state = getState();

  if (body.url.includes(state.config.k3dDomain || 'localdev.me')) {
    try {
      await fetch(body.url, { mode: 'no-cors' });
      return dispatch(setAvailableSite({ url: body.url }));
    } catch (error) {
      // supressing error for local
    }
  } else {
    const response = await readiness.initiate(body);
    return dispatch(response).unwrap();
  }
});
