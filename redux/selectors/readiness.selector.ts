import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const readinessSelector = (state: RootState) => state.readiness;

export const selectAvailableSites = () =>
  createSelector(readinessSelector, ({ availableSites }) => availableSites);
