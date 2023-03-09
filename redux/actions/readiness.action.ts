/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/';
import { setMetaphorValidSite } from '../../redux/slices/readiness.slice';

const { readiness } = endpoints;

export const checkReadiness = createAsyncThunk<any, any>(
  'readiness/check',
  async (body, { dispatch }) => {
    if (body.url.includes('localdev.me')) {
      try {
        await fetch(body.url, { mode: 'no-cors' });
        return dispatch(setMetaphorValidSite({ url: body.url }));
      } catch (error) {
        // supressing error for local
      }
    } else {
      const response = await readiness.initiate(body);
      return dispatch(response).unwrap();
    }
  },
);
