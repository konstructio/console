import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ClusterUsage, License } from '@/types/subscription';
import {
  activateLicenseKey,
  getClusterUsage,
  validateLicenseKey,
} from '@/redux/thunks/subscription.thunk';

export interface LicenseState {
  license?: License;
  isLoading: boolean;
  clusterUsageList: Array<ClusterUsage>;
  error?: string;
}

export const initialState: LicenseState = {
  isLoading: false,
  clusterUsageList: [],
};

const subscriptionSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    setLicense: (state, { payload }: PayloadAction<LicenseState['license']>) => {
      state.license = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateLicenseKey.fulfilled, (state, { payload }) => {
        state.license = payload;
        state.isLoading = false;
      })
      .addCase(validateLicenseKey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateLicenseKey.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(activateLicenseKey.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(activateLicenseKey.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(activateLicenseKey.rejected, (state) => {
        state.isLoading = false;
        state.error =
          'Please enter a valid license key. If this error persists please reach out to the kubefirst team.';
      })
      .addCase(getClusterUsage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.clusterUsageList = payload;
      })
      .addCase(getClusterUsage.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getClusterUsage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setLicense } = subscriptionSlice.actions;

export const subscriptionReducer = subscriptionSlice.reducer;
