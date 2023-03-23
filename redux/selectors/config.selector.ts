import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const configSelector = (state: RootState) => state.config;

export const selectIsTelemetryEnabled = () =>
  createSelector(configSelector, ({ isTelemetryEnabled }) => !!isTelemetryEnabled);

export const selectKubefirstVersion = () =>
  createSelector(configSelector, ({ kubefirstVersion }) => kubefirstVersion || '');
