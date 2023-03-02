import { createSelector } from '@reduxjs/toolkit';

import { ISessionState } from '../slices/session.slice';
import { RootState } from '../store';

const sessionSelector = (state: RootState): ISessionState => state.session || {};

export const selectUserInfo = () =>
  createSelector(sessionSelector, ({ email, name }) => ({ email, name }));

export const selectHasSession = () =>
  createSelector(sessionSelector, ({ email, name }) => !!email && !!name);
