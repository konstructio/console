import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { consoleApi } from './api';
import configSlice from './slices/config.slice';
import installationSlice from './slices/installation.slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [consoleApi.reducerPath]: consoleApi.reducer,
      config: configSlice,
      installation: installationSlice,
    },
    middleware: (gDM) => gDM().concat(consoleApi.middleware),
  });

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
