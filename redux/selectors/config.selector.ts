import { createSelector } from '@reduxjs/toolkit';

import { ConfigState } from '../slices/config.slice';
import { RootState } from '../store';

const configSelector = (state: RootState): ConfigState => state.config;

export const selectIsTelemetryEnabled = () =>
  createSelector(configSelector, ({ isTelemetryEnabled }) => !!isTelemetryEnabled);

export const selectIsLocal = () => createSelector(configSelector, ({ isLocal }) => !!isLocal);
