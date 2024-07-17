import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const environmentsSelector = (state: RootState) => state.environments;

export const selectEnvironmentsState = () =>
  createSelector(environmentsSelector, (environmentsState) => environmentsState);
