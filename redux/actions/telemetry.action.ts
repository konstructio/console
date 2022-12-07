/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api/';

const { track } = endpoints;

export const sendTrackEvent = createAsyncThunk<any, any>('telemetry/track', async (body) => {
  return await track.initiate(body);
});
