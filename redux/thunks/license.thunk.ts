import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { License } from '@/types/license';

export const getLicenseKey = createAsyncThunk<License>('license/getLicenseKey', async () => {
  return (await axios.get<License>('/api/proxy/license&target=ee')).data;
});
