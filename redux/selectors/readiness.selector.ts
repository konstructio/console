import { createSelector } from '@reduxjs/toolkit';

import { ReadinessState } from '../slices/readiness.slice';
import { RootState } from '../store';

const readinessSelector = (state: RootState): ReadinessState => state.readiness;

export const selectMetaphorValidUrls = () =>
  createSelector(readinessSelector, ({ metaphorValidSites }) => metaphorValidSites || []);
