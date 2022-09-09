import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { internalApi } from './api/internalApi';
import configSlice from './slices/config.slice';

export const store = configureStore({
  reducer: {
    [internalApi.reducerPath]: internalApi.reducer,
    config: configSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
