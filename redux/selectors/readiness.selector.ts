import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const readinessSelector = (state: RootState) => state.readiness;

export const selectMetaphorValidUrls = () =>
  createSelector(readinessSelector, ({ metaphorValidSites }) => metaphorValidSites);
