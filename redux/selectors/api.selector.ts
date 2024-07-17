import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const apiSelector = (state: RootState) => state.api;

export const selectApiState = () => createSelector(apiSelector, (apiState) => apiState);
