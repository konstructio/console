import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import userSlice from './slices/user.slice';

export const store = configureStore({
  reducer: {
    users: userSlice,
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
