import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getFlags } from '@/redux/thunks/config.thunk';
import { FeatureFlag } from '@/types/config';

export interface FeatureFlagsState {
  flags: Record<FeatureFlag, boolean>;
  isLoading: boolean;
}

export const initialState: FeatureFlagsState = {
  flags: {
    [FeatureFlag.CLUSTER_MANAGEMENT]: false,
    [FeatureFlag.CLUSTER_PROVISIONING]: false,
    [FeatureFlag.GITOPS_CATALOG]: false,
    [FeatureFlag.MARKETPLACE]: false,
    [FeatureFlag.MULTICLUSTER_MANAGEMENT]: false,
    [FeatureFlag.PROVISION_AWS_PYHS_CLUSTERS]: false,
    [FeatureFlag.PROVISION_DO_PYHS_CLUSTERS]: false,
    [FeatureFlag.PROVISION_GCP_PYHS_CLUSTERS]: false,
    [FeatureFlag.PROVISION_VULTR_PYHS_CLUSTERS]: false,
  },
  isLoading: false,
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    setFlags: (state, { payload }: PayloadAction<FeatureFlagsState['flags']>) => {
      state.flags = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getFlags.fulfilled,
        (state, { payload }: PayloadAction<Record<FeatureFlag, boolean>>) => {
          state.isLoading = false;
          state.flags = {
            ...state.flags,
            ...payload,
          };
        },
      )
      .addCase(getFlags.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFlags } = featureFlagsSlice.actions;

export const featureFlagsReducer = featureFlagsSlice.reducer;
