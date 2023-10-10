import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const configSelector = (state: RootState) => state.config;

export const selectConfig = () => createSelector(configSelector, (config) => config);
