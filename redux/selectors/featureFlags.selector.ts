import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const featureFlagsSelector = (state: RootState) => state.featureFlags;

export const selectFeatureFlags = () =>
  createSelector(featureFlagsSelector, (featureFlags) => featureFlags);
