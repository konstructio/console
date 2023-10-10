import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const installationSelector = (state: RootState) => state.installation;

export const selectInstallation = () =>
  createSelector(installationSelector, (installation) => installation);
