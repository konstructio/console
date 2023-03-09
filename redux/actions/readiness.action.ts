/* eslint-disable @typescript-eslint/no-explicit-any */
import https from 'https';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/';
import { setMetaphorValidSite } from '../../redux/slices/readiness.slice';

const { readiness } = endpoints;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const checkReadiness = createAsyncThunk<any, any>(
  'readiness/check',
  async (body, { dispatch }) => {
    if (body.url.includes('localdev.me')) {
      try {
        await axios.get(body.url, { httpsAgent: httpsAgent });
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
