import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const featureFlagSelector = (state: RootState) => state.featureFlags;

export const selectFlags = (flagName: string) =>
  createSelector(featureFlagSelector, ({ flags }) => flags[flagName]);

export const selectFlagsLoaded = () => createSelector(featureFlagSelector, ({ loaded }) => loaded);
