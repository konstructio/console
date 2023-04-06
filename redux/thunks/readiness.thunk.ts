import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../utils/getErrorMessage';

export const checkReadiness = createAsyncThunk<string, string, { rejectValue: string }>(
  'valid-metaphor-sites/check',
  async (url, { rejectWithValue }) => {
    if (url.includes('localdev.me')) {
      try {
        const res = await fetch(url, { mode: 'no-cors' });
        if (!res.ok) {
          throw Error('unable to ping url');
        }
        return url;
      } catch (error) {
        throw Error(getErrorMessage(error, 'check readiness fail'));
      }
    }
    return rejectWithValue('url does not include localdev.me');
  },
);
