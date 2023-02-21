/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/';

const { readiness } = endpoints;

export const checkReadiness = createAsyncThunk<any, any>(
  'readiness/check',
  async (body, { dispatch }) => {
    const response = await readiness.initiate(body);
    return dispatch(response).unwrap();
  },
);
