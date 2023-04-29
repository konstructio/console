import router from 'next/router';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createCluster, deleteCluster, getCluster } from '../thunks/cluster';
import { ProvisionStatus } from '../../types/provision';

export interface apiState {
  loading: boolean;
  isSuccess: boolean;
  status?: ProvisionStatus;
  isError: boolean;
}

export const initialState: apiState = {
  isSuccess: false,
  isError: false,
  status: undefined,
  loading: false,
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCluster.fulfilled, (state, { payload }: PayloadAction<{ Status: string }>) => {
        state.loading = false;
        state.status = payload.Status as ProvisionStatus;

        if (payload.Status === ProvisionStatus.PROVISIONED) {
          state.isSuccess = true;
        }
      })
      .addCase(createCluster.rejected, (state) => {
        state.loading = false;
        state.isSuccess = false;
      })
      .addCase(deleteCluster.fulfilled, () => {
        router.push('/provision');
      })
      .addCase(getCluster.fulfilled, (state, { payload }: PayloadAction<{ Status: string }>) => {
        state.loading = false;
        state.status = payload.Status as ProvisionStatus;
      });
  },
});

export const clusterReducer = clusterSlice.reducer;
