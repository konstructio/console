import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const applicationsSelector = (state: RootState) => state.applications;

export const selectApplications = () =>
  createSelector(applicationsSelector, (applicationsState) => applicationsState);
