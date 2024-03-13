import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

import { createQueryString } from '@/utils/url/formatDomain';

type TourStatusReturn = {
  'console-tour': string;
};

export const getClusterTourStatus = createAsyncThunk<string, string, { state: RootState }>(
  'settings/getClusterTourStatus',
  async (clusterName) => {
    return (
      await axios.get<TourStatusReturn>(
        `/api/proxy?${createQueryString('url', `/secret/${clusterName}/kubefirst-state`)}`,
      )
    ).data['console-tour'];
  },
);

export const updateClusterTourStatus = createAsyncThunk<
  void,
  { clusterName: string; takenTour: boolean },
  { state: RootState }
>('settings/updateClusterTourStatus', async ({ clusterName, takenTour }) => {
  await axios.put<void>('/api/proxy', {
    url: `/secret/${clusterName}/kubefirst-state`,
    body: {
      'console-tour': `${takenTour}`,
    },
  });
});
