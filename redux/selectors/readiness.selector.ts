import { createSelector } from '@reduxjs/toolkit';

import { ReadinessState } from '../slices/readiness.slice';
import { RootState } from '../store';

const readinessSelector = (state: RootState): ReadinessState => state.readiness;

export const selectAvailableSites = () =>
  createSelector(readinessSelector, ({ availableSites }) => availableSites);
