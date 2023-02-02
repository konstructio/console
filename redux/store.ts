import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { consoleApi } from './api';
import { githubApi } from './api/github';
import configSlice from './slices/config.slice';
import installationSlice from './slices/installation.slice';
import githubSlice from './slices/github.slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [consoleApi.reducerPath]: consoleApi.reducer,
      [githubApi.reducerPath]: githubApi.reducer,
      config: configSlice,
      installation: installationSlice,
      github: githubSlice,
    },
    middleware: (gDM) => gDM().concat(consoleApi.middleware, githubApi.middleware),
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
